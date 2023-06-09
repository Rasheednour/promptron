"use client";
import { Fragment, useState } from "react";
import "@styles/overlay.css";
import Image from "next/image";

type Props = {
    isOpen: Boolean,
    onClose: (prompt?:Prompt) => void,
    children: JSX.Element,
    overlayImage: string,
    setOverlayImage: () => void
}
export function Overlay({isOpen, onClose, children, overlayImage, setOverlayImage}: Props) {
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(children.props.children);
    navigator.clipboard.writeText(children.props.children);
    setTimeout(() => setCopied(""), 3000);
  };

 
 
  return (
    <>
      {isOpen && (
        <div>
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container">
            <div className="overlay__controls">
              <div
                className="copy_btn  hover:bg-gray-300 mt-0 mb-3 mr-3 border-gray-900"
                onClick={handleCopy}
              >
                <Image
                  src={
                    copied === children.props.children
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                  }
                  width={12}
                  height={12}
                  alt="copy-image"
                />
              </div>
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
            <div className="overlay_image">
                {overlayImage && (
                    <Image
                    src={overlayImage}
                    width={600}
                    height={600}
                    alt="midjourney user image"
                    className="mt-3 mb-3"
                  />
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overlay;
