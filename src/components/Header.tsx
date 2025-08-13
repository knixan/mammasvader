import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 drop-shadow-2xl">
      <h1 className="mb-4 text-4xl p-6 rounded-3xl bg-purple-700 text-white font-black leading-tight sm:text-5xl lg:text-6xl animate-bounce-slow">
        MAMMAS VÄDERAPP
      </h1>
      <p className="text-xl font-bold p-4 rounded-2xl text-white bg-pink-500 leading-snug lg:text-xxl">
        Skriv in staden du är i och se vad mamma säger... 👩‍👧‍👦
      </p>
    </header>
  );
};

export default Header;
