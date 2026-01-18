import React from "react";

const AbstractFormPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-[#021373] text-center mb-8">
            International Conference
          </h1>

          <section className="mt-8 bg-gray-100 p-6 my-2 rounded-lg shadow-md text-gray-700 border-l-4 border-blue-600">
            <p className="mb-4">
              The call for abstracts for the International Conference is now closed.
              The International Conference Scientific Committee (NSC) thanks all participants
              who submitted their research for presentation during the Congress.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#021373] mb-4">
                  Areas of Specialization
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Pharmaceutical Technology</li>
                  <li>Medicinal Chemistry</li>
                  <li>
                    Pharmacognosy, Indigenous Drugs, Herbal Formulations, and
                    Phytochemistry
                  </li>
                  <li>
                    Pharmacology and Toxicology, Clinical Research &
                    Pharmacovigilance
                  </li>
                  <li>Pharmaceutical Analysis and Quality Assurance</li>
                  <li>Biopharmaceutics, Pharmacokinetics & Drug Metabolism</li>
                  <li>Biotechnology and Biotherapeutics</li>
                  <li>Hospital, Community, and Clinical Pharmacy</li>
                  <li>Pharmaceutical Education and Professional Pharmacy</li>
                  <li>Drug Regulatory Affairs & Pharmaceutical Management</li>
                  <li>Pharmacoeconomics and Pharmacoepidemiology</li>
                  <li>
                    Artificial Intelligence / Bioinformatics / Data Analytics
                  </li>
                </ul>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#021373] mb-4">
                  Abstract Content
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    The abstract should summarize the work proposed to be
                    presented, including the objectives, methods, results, and
                    conclusions.
                  </li>
                  <li>
                    Abstracts must be original and not previously published or
                    presented at another conference.
                  </li>
                  <li>Font: Times New Roman</li>
                  <li>Title: Font Size 14 + Bold</li>
                  <li>Abstract Body Content: Justified</li>
                  <li>
                    Author Name, Affiliation & Abstract Body: Font Size 12
                  </li>
                  <li>Word Limit: Between 250 - 350</li>
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#021373] mb-4">
                  Submission Instructions
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    The abstract should be prepared according to the guidelines
                    provided on the website.
                  </li>
                  <li>
                    Submit the abstract in the prescribed format and paste it
                    into the designated space on the submission portal.
                  </li>
                  <li>Abstracts must be submitted online only.</li>
                  <li>The deadline for submission is 17 January, 2026.</li>
                  <li>
                    A model abstract is available for reference on the website.
                  </li>
                </ul>
                <div className="mt-4 space-x-4">
                  <a
                    href="https://docs.google.com/document/d/1XNRgI2o0S6oaC0quxcxj0Aw0CVV93Ft3/edit?usp=sharing&ouid=108384988200604232400&rtpof=true&sd=true"
                    className="text-[#034C8C] hover:text-[#000000] font-bold underline transition duration-300"
                  >
                    MODEL ABSTRACT
                  </a>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {/* <a
                      href="https://docs.google.com/presentation/d/1L_e3SSNTSXFWkthYOO5wOk3xhSzYhPBc/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-[#021373] text-white text-sm font-semibold hover:bg-[#032b7a] transition"
                    >
                      Model E-Poster Template
                    </a>
                    <a
                      href="https://docs.google.com/presentation/d/1-lKSpS42WNShrnJqDx915MlF5_A8jlTW/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-[#021373] text-white text-sm font-semibold hover:bg-[#032b7a] transition"
                    >
                      Model Oral Presentation Template
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1_wM_k-nGHpIFdUOZr8AeZY_uiJsFFrAx/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-[#021373] text-white text-sm font-semibold hover:bg-[#032b7a] transition"
                    >
                      E-Poster Presentation Guidelines
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1dSn5qBTwk1pbmXqgPydmDZ5d3ghcTios/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-[#021373] text-white text-sm font-semibold hover:bg-[#032b7a] transition"
                    >
                      Oral Presentation Guidelines
                    </a> */}
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#021373] mb-4">
                  Review Process
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>All submitted abstracts will be reviewed by the NSC.</li>
                  <li>
                    Selected abstracts will be notified for Poster and/or Oral
                    presentation.
                  </li>
                  <li>
                    The best Poster and/or Oral presentations will be selected
                    from each category and announced during the valedictory
                    function.
                  </li>
                </ul>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-[#021373] mb-4">
                  Presentation Guidelines & Rewards
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    Detailed guidelines for Poster and Oral presentations will
                    be provided upon acceptance of the abstract.
                  </li>
                  <li>
                    Presenters must be registered delegates of National
                    Conference.
                  </li>
                  <li>
                    The best Poster and/or Oral presentations in each category
                    will receive a certificate and a memento.
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <section className="mt-8 bg-red-50 p-6 rounded-lg shadow-md border border-red-200 text-center">
            <h3 className="text-xl font-semibold mb-2 text-red-700">Submissions Closed</h3>
            <p className="text-red-600 font-medium">
              The abstract submission deadline has passed (17 January, 2026).
              New submissions are no longer being accepted.
            </p>
          </section>

          {/* Form and Dialog removed as submissions are closed */}
        </div>
      </div>
    </div>
  );
};

export default AbstractFormPage;
