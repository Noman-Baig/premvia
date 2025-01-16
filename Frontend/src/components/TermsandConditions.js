import React from "react";
import styled from "styled-components";

const TermsAndConditions = () => {
  return (
    <TermsContainer>
      <Title>T&Cs</Title>
      <Subtitle>By using Premvia, you agree to the following terms.</Subtitle>

      <TermsContent>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          These Terms and Conditions govern your use of our website and services.
          By accessing or using Premvia, you agree to comply with these terms.
        </Paragraph>

        <SectionTitle>Use of Services</SectionTitle>
        <Paragraph>
          You may use our website and services only for lawful purposes and in
          accordance with our guidelines. Any violation of these terms may result
          in suspension or termination of your account.
        </Paragraph>

        <SectionTitle>Account Responsibility</SectionTitle>
        <Paragraph>
          You are responsible for maintaining the confidentiality of your account
          information, including your username and password. You agree to notify us
          immediately if you believe your account has been compromised.
        </Paragraph>

        <SectionTitle>Orders and Payments</SectionTitle>
        <Paragraph>
          All orders placed on our website are subject to availability and acceptance.
          We reserve the right to refuse any order at our discretion. Payments are processed
          securely through our payment gateway.
        </Paragraph>

        <SectionTitle>Returns and Refunds</SectionTitle>
        <Paragraph>
          Our return and refund policy allows you to return eligible products within
          30 days of purchase for a full refund, subject to our return conditions.
        </Paragraph>

        <SectionTitle>Limitation of Liability</SectionTitle>
        <Paragraph>
          Premvia will not be liable for any direct, indirect, incidental, special,
          or consequential damages arising from the use or inability to use our website
          or services.
        </Paragraph>

        <SectionTitle>Changes to Terms</SectionTitle>
        <Paragraph>
          We may update these Terms and Conditions from time to time. Any changes will
          be posted on this page, and by continuing to use our services, you agree to
          the updated terms.
        </Paragraph>

        <SectionTitle>Contact Us</SectionTitle>
        <Paragraph>
          For any questions or concerns regarding these Terms and Conditions, please
          contact us at{" "}
          <Link href="mailto:support@premvia.com">support@premvia.com</Link>.
        </Paragraph>
      </TermsContent>
    </TermsContainer>
  );
};

// Styled Components

const TermsContainer = styled.div`
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
  text-align:left;
  font-size: 1.2rem;
  font-weight: 400;
`;

const TermsContent = styled.section`
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

const Link = styled.a`
  color: #76c7c0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default TermsAndConditions;
