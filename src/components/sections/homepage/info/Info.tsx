import React from "react";

const Info = () => {
  return (
    <section className="info-section">
      <div className="info-section-inner-wrapper">
        <h2 className="section-header">
          więcej <span className="theme-red">info</span>
        </h2>
        <div className="issue-example">
          <p className="question">Znalazłeś buga lub błąd merytoryczny?</p>
          <p className="answer">
            Zgłoś issue na{" "}
            <a
              className="external-link"
              href="https://github.com/AdamKniec/bmw/issues"
              target="_blank"
              rel="noreferrer"
            >
              githubie
            </a>{" "}
          </p>
        </div>
        <div className="issue-example">
          <p className="question">Chcesz się skontaktować w innej sprawie?</p>
          <p className="answer">
            Napisz na{" "}
            <a className="external-link" href="mailto:adam.k.kniec@gmail.com">
              adam.k.kniec@gmail.com
            </a>
          </p>
        </div>
        <div className="issue-example">
          <p className="question">Umiesz w instagramy?</p>
          <p className="answer">
            Zapraszam na mojego{" "}
            <a
              className="external-link"
              href="https://www.instagram.com/bolimnieweb/"
              rel="noreferrer"
              target="_blank"
            >
              instagrama!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Info;
