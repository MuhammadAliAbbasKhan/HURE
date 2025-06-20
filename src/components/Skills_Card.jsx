import React, { useState } from 'react';
import Styles from '../../styles/colors.module.scss';
import websites from '../../utils/Website/Website_Info.js';

const SkillsCard = ({ title, description, overlayText }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Styles
  const styles = {
    card: {
        position: 'relative',
        width: '350px',
        height: '360px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isHovered 
        ? '0 10px 30px rgba(30, 144, 255, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backgroundColor: isHovered ? Styles.primaryColor1 : "lightgray",
         
      cursor: 'pointer',
    
      transform: isHovered ? 'translateY(-5px)' : 'none',
      border: `1px solid ${isHovered ? Styles.primaryColor2: '#eaeaea'}`,
      '@media (max-width: 768px)': {
        width: '280px',
        height: '300px'
      }
    },
    cardContent: {
      padding: '60px',
      color: isHovered ? Styles.primaryColor3 : '#333',
      transition: 'all 0.4s ease',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '@media (max-width: 768px)': {
        padding: '30px'
      }
    },
    cardTitle: {
      marginTop: '0',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1.3',
      letterSpacing: '0.5px',
      transition: 'all 0.4s ease',
      color: isHovered ? Styles.primaryColor1 : Styles.primaryColor2,
      '@media (max-width: 768px)': {
        fontSize: '20px',
        marginBottom: '15px'
      }
    },
    cardDescription: {
      margin: '0',
      fontSize: '16px',
      lineHeight: '1.6',
      opacity: isHovered ? '0' : '1',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: isHovered ? 'translateY(10px)' : 'none',
      '@media (max-width: 768px)': {
        fontSize: '14px'
      }
    },
    cardOverlay: {
      position: 'absolute',
      top: isHovered ? '0' : '-100%',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: Styles.primaryColor1,
      color: Styles.primaryColor5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
      padding: '40px',
      boxSizing: 'border-box',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        padding: '30px'
      }
    },
    overlayContent: {
      transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
      opacity: isHovered ? '1' : '0',
      transition: 'all 0.4s ease 0.2s',
      width: '100%'
    },
    overlayTitle: {
      marginTop: '0',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1.3',
      letterSpacing: '0.5px',
      color: Styles.primaryColor5,
      '@media (max-width: 768px)': {
        fontSize: '20px',
        marginBottom: '15px'
      }
    },
    overlayDescription: {
      margin: '0',
      fontSize: '16px',
      lineHeight: '1.6',
      color: Styles.primaryColor3,
      '@media (max-width: 768px)': {
        fontSize: '14px'
      }
    }
  };

  // Merge media queries (since React doesn't support @media in inline styles)
  const responsiveStyles = {
    card: {
      ...styles.card,
      '@media (max-width: 768px)': undefined, // Remove the media query
    },
    cardContent: {
      ...styles.cardContent,
      '@media (max-width: 768px)': undefined,
    },
    // Add similar for other styles with media queries
  };

  return (
    <div 
      style={responsiveStyles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDescription}>{description}</p>
      </div>
      <div style={styles.cardOverlay}>
        <div style={styles.overlayContent}>
          <h3 style={styles.overlayTitle}>{title}</h3>
          <p style={styles.overlayDescription}>{overlayText || description}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;