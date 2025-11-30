import React from "react";

const SocialMediaPost = ({
  name,
  affiliation,
}: {
  name: string;
  affiliation: string;
}) => {
  return (
    <div
      style={{
        width: "1080px",
        height: "1080px",
        background: "linear-gradient(180deg, #300060 0%, #530060 100%)",
        fontFamily: "Arial, sans-serif",
        color: "white",
        textAlign: "center",
        padding: "40px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1
          style={{
            color: "#FFD700",
            fontSize: "60px",
            margin: "0 0 20px",
            fontWeight: "bold",
          }}
        >
          International Conference
        </h1>

        <p
          style={{
            fontSize: "24px",
            margin: "0 0 20px",
          }}
        >
          International Conference on
        </p>

        <h2
          style={{
            fontSize: "28px",
            margin: "0 0 20px",
            padding: "0 100px",
            lineHeight: "1.4",
          }}
        >
          &quot;Emerging Innovations in Pharmaceutical Sciences and Drug
          Discovery&quot;
        </h2>

        <p
          style={{
            fontSize: "24px",
            margin: "0 0 40px",
          }}
        >
          22<sup>nd</sup> and 23<sup>rd</sup> January, 2026
        </p>
      </div>

      {/* <div
        style={{
          width: "200px",
          height: "200px",
          overflow: "hidden",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div> */}

      <h3
        style={{
          color: "#FFA500",
          fontSize: "48px",
          margin: "20px 0 10px",
          fontWeight: "bold",
        }}
      >
        {name}
      </h3>

      <p
        style={{
          color: "#FFA500",
          fontSize: "20px",
          margin: "0 0 20px",
        }}
      >
        {affiliation}
      </p>

      <p
        style={{
          color: "#FFA500",
          fontSize: "40px",
          fontWeight: "black",
          margin: "0",
        }}
      >
        Hey! I&apos;m Attending the International Conference 2026
      </p>

      <div
        style={{
          fontSize: "16px",
          marginTop: "30px",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          Organized by Department of Pharmaceutical Chemistry,
        </p>
        <p style={{ margin: "5px 0" }}>
          Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
        </p>
      </div>
    </div>
  );
};

export default SocialMediaPost;
