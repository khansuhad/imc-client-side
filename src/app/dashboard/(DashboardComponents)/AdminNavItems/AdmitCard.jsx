// components/AdmitCardPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    width: '591px', // A4 width
    height: '418px', // A4 height
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.1,
    zIndex: -1,
  },
  watermarkImage: {
    width: "200px",
    height:  "200px",
    
  },
  borderBox: {
    border: '1px solid #000',
    height: '100%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    objectFit :"cover"
  },
  centerText: {
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  admitCard: {
    backgroundColor: '#ff0000',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
 
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  gridItem: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'medium',
  },
  subjectSection: {
    marginTop: 10,
  },
  subjectTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  subjectList: {
    flexDirection: 'row',
    gap: 20,
  },
  subjectColumn: {
    gap: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  footerText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'medium',
  },
});

// PDF Document Component
const AdmitCardPDF = ({ studentInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <View style={styles.watermark}>
        <Image
          src="/assets/images/Logo-removebg-preview.png" // Replace with your image URL
          style={styles.watermarkImage}
        />
      </View>

      {/* Main Content */}
      <View style={styles.borderBox}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            src="/assets/images/Logo.webp" // Replace with your image URL
            style={styles.logo}
          />
          <View style={styles.centerText}>
            <Text style={styles.title}>INFINITY MATH CENTER, MOULVIIBAZAR</Text>
            <Text style={styles.subtitle}>SSC 2025 BATCH</Text>
            <View style={styles.admitCard}>
              <Text>Admit Card</Text>
            </View>
          </View>
        </View>

        {/* Student Info Grid */}
        <View style={styles.grid}>
          <View style={{ gap: 10 }}>
            <Text style={styles.gridItem}>Examiner name: {studentInfo?.name}</Text>
            <Text style={styles.gridItem}>Father’s name: {studentInfo?.fathersOrHusbandName}</Text>
            <Text style={styles.gridItem}>Educational Institution: {studentInfo?.studentSchool}</Text>
          </View>
          <View style={{ gap: 10 }}>
            <Text style={styles.gridItem}>Id No: {studentInfo?.rollNo}</Text>
            <Text style={styles.gridItem}>Reg. No: {studentInfo?.registrationNo}</Text>
            <Text style={styles.gridItem}>Group: {studentInfo?.group}</Text>
          </View>
        </View>

        {/* Subject Section */}
        <View style={styles.subjectSection}>
          <Text style={styles.subjectTitle}>Subject & Subject Code</Text>
          <View style={styles.subjectList}>
            <View style={styles.subjectColumn}>
              <Text style={styles.gridItem}>Bangla 1st paper-101</Text>
              <Text style={styles.gridItem}>English 2nd paper-102</Text>
              <Text style={styles.gridItem}>English 1st paper-107</Text>
              <Text style={styles.gridItem}>English 2nd paper-108</Text>
              <Text style={styles.gridItem}>General math-109</Text>
              <Text style={styles.gridItem}>Religion and moral education-111</Text>
            </View>
            <View style={styles.subjectColumn}>
              <Text style={styles.gridItem}>Higher math-126</Text>
              <Text style={styles.gridItem}>Physics-136</Text>
              <Text style={styles.gridItem}>Chemistry-137</Text>
              <Text style={styles.gridItem}>Biology-138</Text>
              <Text style={styles.gridItem}>Bangladesh and global studies-150</Text>
              <Text style={styles.gridItem}>Information and communication technology-154</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.centerText}>
            <Text style={styles.footerText}>Ahmad Ali</Text>
            <Text style={styles.footerText}>Director, Infinity Math Center</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AdmitCardPDF;