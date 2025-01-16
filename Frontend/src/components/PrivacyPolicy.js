import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      
        <Title>Privacy Policy</Title>
        <Subtitle>Your privacy matters to us at Premvia.</Subtitle>
     
      <PrivacyContent>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          At Premvia, we are committed to safeguarding your privacy. This
          Privacy Policy outlines how we collect, use, and protect your
          information when you interact with our services.
        </Paragraph>

        <SectionTitle>Information We Collect</SectionTitle>
        <Paragraph>
          We collect personal information you provide, such as your name, email
          address, and payment details. Additionally, we may collect data
          automatically through cookies and other tracking technologies when you
          browse our website.
        </Paragraph>

        <SectionTitle>How We Use Your Information</SectionTitle>
        <Paragraph>
          We use the information we collect for the following purposes:
        </Paragraph>
        <List>
          <ListItem>To process your orders and provide services.</ListItem>
          <ListItem>To improve your experience on our website.</ListItem>
          <ListItem>To send important updates and promotions.</ListItem>
          <ListItem>To comply with legal requirements and protect our rights.</ListItem>
        </List>

        <SectionTitle>Data Security</SectionTitle>
        <Paragraph>
          We implement appropriate security measures to protect your data. While
          we strive for the highest security standards, no data transmission is
          100% secure, and we cannot guarantee absolute protection.
        </Paragraph>

        <SectionTitle>Contact Us</SectionTitle>
        <Paragraph>
          For any questions or concerns regarding this Privacy Policy, please
          contact us at{" "}
          <Link href="mailto:support@premvia.com">support@premvia.com</Link>.
        </Paragraph>
      </PrivacyContent>
    </PrivacyContainer>
  );
};

// Styled Components

const PrivacyContainer = styled.div`
  padding: 40px 20px;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #1c1c1c;
  color: #d3d3d3;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

 

const Title = styled.h1`
  color: #fff;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #a8a8a8;
  font-size: 1.2rem;
  font-weight: 400;
`;

const PrivacyContent = styled.section`
  width: 90%;
  color: #e0e0e0;
  line-height: 1.8;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-top: 30px;
  text-align: left;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 1.1rem;
  text-align: left;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-top: 10px;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 10px;
  text-align: left;
`;

const Link = styled.a`
  color: #76c7c0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default PrivacyPolicy;
