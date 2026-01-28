import React from 'react';

function ShareIconPopup() {
  return (
    <div className="absolute z-30 top-[0px] left-[68px] w-[61px] flex flex-col gap-[10px] p-3 bg-white rounded shadow-md">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/sharer.php?u=https://www.ajio.com/nike-women-revolution-7-running-shoes/p/469581310_black"
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        aria-label="Facebook"
        className="hover:opacity-75"
      >
        <img
          src="/facebook.png"
          alt="Facebook"
          className="w-[35px] h-[35px]"
        />
      </a>

      {/* Instagram (No direct sharing link, could link to your brand's IG) */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        aria-label="Instagram"
        className="hover:opacity-75"
      >
        <img
          src="/instagram.png"
          alt="Instagram"
          className="w-[35px] h-[35px]"
        />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.ajio.com/nike-women-revolution-7-running-shoes/p/469581310_black"
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        aria-label="LinkedIn"
        className="hover:opacity-75"
      >
        <img
          src="/linkdin.png"
          alt="LinkedIn"
          className="w-[35px] h-[35px]"
        />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/?text=https://www.ajio.com/nike-women-revolution-7-running-shoes/p/469581310_black"
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        aria-label="WhatsApp"
        className="hover:opacity-75"
      >
        <img
          src="/whatsapp.png"
          alt="WhatsApp"
          className="w-[35px] h-[35px]"
        />
      </a>

      {/* YouTube (not a share option, but brand link) */}
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="YouTube"
        aria-label="YouTube"
        className="hover:opacity-75"
      >
        <img
          src="/youtube.png"
          alt="YouTube"
          className="w-[35px] h-[35px]"
        />
      </a>
    </div>
  );
}

export default ShareIconPopup;
