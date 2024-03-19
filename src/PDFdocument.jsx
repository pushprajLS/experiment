import React from "react";
import "./assets/styles/AgreementStyle.module.css";

const PDFdocument = ({ clientDetails }) => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Client Rights and Responsibilities
      </h1>
      <div className="page-break-inside">
        <p>
          This Agreement is entered into as of the XX day of October, 200X,
          between _______________________(“the Committee”) and
          ________________________ (“the Contractor”).
        </p>
        <p>
          As a client of the Indiana Small Business Development Center (SBDC),
          we'd like to advise you of certain rights and responsibilities you
          have as one of our clients: You have a right to expect:
        </p>
        <ol>
          <li>
            Prompt, courteous, and professional counseling services and to be
            advised if the Indiana SBDC is unable to provide service within the
            time frame required. Be aware that due to the demand for our
            services training may be recommended before counseling is provided.
          </li>
          <li>
            All information shared with the Indiana SBDC and any of its
            resources (staff, faculty, volunteers, and consultants) will be held
            in strictest confidence. No information provided by you will be used
            to the commercial advantage of any staff member, consultant, or
            other resource of the Indiana SBDC or to the benefit of any third
            party.
          </li>
          <li>
            That your client status with the Indiana SBDC will remain
            confidential. No public use of your name, address, or business
            identity will be made without your prior approval. Please note,
            however, that the Indiana SBDC is funded in part by the U.S. Small
            Business Administration, the State of Indiana, and the local host,
            so limited information with respect to your client status is
            provided to those entities.
          </li>
        </ol>
        <p>
          Our role is to counsel and assist small business owners and those
          planning to go into business. We will not make business decisions or
          judgments for you, though we will make recommendations and suggestions
          as appropriate. These will be based upon our best efforts to apply the
          experience and resources available to us to assist you in making your
          own business decisions.
        </p>
        <p>
          The Indiana SBDC may charge reasonable fees for training programs,
          special services, and publications. However, you have a right to feel
          secure that no fee will be charged by the Indiana SBDC for normal
          counseling services provided to you. Also, no recommendations will be
          made as to the purchase of goods or services from any individual or
          firm with whom any Indiana SBDC staff have any financial, familial or
          personal interest.
        </p>
        <p>
          The counseling services provided to you are a part of the effort of
          the Indiana SBDC and its sponsors to respond to the growing needs of
          the small business community and to positively affect the economy of
          Indiana. They are not intended to compete with, replace, or be a
          substitute for services available from the private sector.
        </p>
        <p>
          In consideration of the Indiana SBDC furnishing you with management
          and technical assistance, you agree to waive all claims against the
          Indiana SBDC and its constituent institutions, its staff, or any other
          resources employed by or used in connection with these services. You
          will also be expected to cooperate with the Indiana SBDC in its
          efforts to assure the quality and effectiveness of the counseling
          services it provides.
        </p>
        <p>
          In this respect, the Indiana SBDC will ask all clients who receive
          counseling assistance to complete a written evaluation of the services
          provided. In addition, all clients will be asked to complete a Client
          Data Collection Form that documents the assistance provided by the
          Indiana SBDC. Finally, clients may receive direct inquiries from this
          office, the State Director's office or the U.S. Small Business
          Administration with respect to the services provided to you. Your
          response to all of these inquiries will be greatly appreciated.
        </p>
      </div>
      <div class="page-break-inside">
        <h2 style={{ fontSize: "16px" }}>Request for Counseling</h2>
        <p>
          I request business counseling service from the Indiana SBDC, a
          Resource Partner of the Small Business Administration (SBA). I agree
          to cooperate should I be selected to participate in surveys designed
          to evaluate SBA services. I certify that I am not presently debarred,
          suspended, proposed for debarment, or declared ineligible or
          voluntarily excluded from covered transactions by any federal
          department or agency. I understand that any information disclosed will
          be held in strict confidence. (The SBDC will not provide your personal
          information to commercial entities.) I authorize the Indiana SBDC to
          furnish relevant information to the assigned management counselor(s).
          I further understand that the counselor(s) agrees not to: 1) recommend
          goods or services from sources in which he/she has an interest, and 2)
          accept fees or commissions developing from this counseling
          relationship. In consideration of the counselor(s) furnishing
          management or technical assistance, I waive all claims against SBDC
          personnel, and that of its Resource Partners and host organizations,
          arising from this assistance.
        </p>
        <p>
          I permit SBA or its agent the use of my name and address for SBA
          surveys and information mailings regarding SBA products and services I
          understand that any information disclosed will be held in strict
          confidence. (SBA will not provide your personal information to
          commercial entities.)
        </p>
        <p>
          IN WITNESS WHEREOF the undersigned have executed this Agreement as of
          the day and year first written above. The parties hereto agree that
          facsimile signatures shall be as effective as if originals.
        </p>
        <div style={{ fontSize: "14px" }}>
          <span>By:_______________________ </span>
          <span style={{ display: "inline-block", marginLeft: "40px" }}>
            By:___________________
          </span>
        </div>
      </div>
    </>
  );
};

export default PDFdocument;
