import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import React from 'react';

// Future enhancement: Register Bengali font for PDF rendering if language is BN.
// Font.register({ family: 'Kalpurush', src: '/fonts/Kalpurush.ttf' });

const styles = StyleSheet.create({
  page: {
    paddingTop: 100, // Roughly 4 inches top margin for Non-Judicial Stamp Paper (300 BDT)
    paddingBottom: 65,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica', // Standard fallback
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  section: {
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontSize: 10,
  },
  signatures: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
  }
});

interface ContractPDFProps {
  title: string;
  content: string; // Markdown text from AI
  firstPartyName: string;
  secondPartyName: string;
}

export const ContractPDF: React.FC<ContractPDFProps> = ({ title, content, firstPartyName, secondPartyName }) => {
  // Simple markdown parser for PDF preview (assuming paragraphs separated by double newlines)
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        {paragraphs.map((p, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.content}>{p}</Text>
          </View>
        ))}

        <View style={styles.signatures} wrap={false}>
          <View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>{firstPartyName || "First Party"}</Text>
          </View>
          <View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>{secondPartyName || "Second Party"}</Text>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages} - Generated securely via eChukti`
        )} fixed />
      </Page>
    </Document>
  );
};
