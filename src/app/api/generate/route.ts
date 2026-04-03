import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import OpenAI from "openai";
import { templates } from "@/config/templates";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { templateId, formData, targetLanguage } = await req.json();

    const template = templates.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ message: "Template not found" }, { status: 404 });
    }

    const langPrompt = targetLanguage === 'bn' ? 'Bengali (formal legal Bangla)' : 'English';

    const systemPrompt = `You are an expert Legal-Tech AI drafting contracts tailored exclusively for the Bangladeshi market.
Ensure the contract clauses are legally sound and compliant with Bangladesh laws, such as the Transfer of Property Act, 1882, and the Contract Act, 1872.
Include standard local clauses (e.g., Trade License responsibilities, VAT/AIT deductions, WASA/DESCO/Titas Gas bill responsibilities).
Format monetary amounts in BDT correctly (e.g., 1,00,000 instead of 100,000).
Draft the contract entirely in ${langPrompt}.
Format the output as a clean, structured document using Markdown formatting (headings, bullet points, bold text).`;

    const userPrompt = `Please draft a "${template.titleEn}" based on the following input parameters provided by the user:
${JSON.stringify(formData, null, 2)}

Ensure all provided details are incorporated naturally into the formal legal language.`;

    // Bypass actual API call in local dev if no key is provided, returning a mocked response
    if (!process.env.OPENAI_API_KEY) {
       console.warn("No OPENAI_API_KEY found. Returning mocked response.");
       const mockedContent = `# ${template.titleEn}\n\n**This is a locally mocked contract generation.**\n\n**Parties:**\nFirst Party: ${formData.firstPartyName || '[Name]'}\nSecond Party: ${formData.secondPartyName || '[Name]'}\n\n**Clauses:**\n1. Rent is fixed at BDT ${formData.monthlyRent ? Number(formData.monthlyRent).toLocaleString('en-IN') : '[Amount]'}.\n2. Standard WASA/DESCO bills are the responsibility of the tenant.\n\n*Drafted securely for the Bangladeshi market.*`;
       return NextResponse.json({ content: mockedContent });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or gpt-3.5-turbo depending on cost preferences
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2, // Low temperature for factual, legal consistency
    });

    const generatedContent = completion.choices[0].message.content;

    return NextResponse.json({ content: generatedContent });

  } catch (error: unknown) {
    console.error("AI Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to generate contract", error: errorMessage }, { status: 500 });
  }
}
