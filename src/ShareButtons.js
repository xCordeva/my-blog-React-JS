import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const ShareButtons = ({ blogUrl, blogTitle }) => {

    const [copied, setCopied] = useState(false)

    const handleFacebookShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(blogTitle)}`;
        window.open(facebookShareUrl, '_blank');
    };

    const handleTwitterShare = () => {
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blogTitle)}`;
        window.open(twitterShareUrl, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(blogUrl);
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000);
    };

    return (
        <div className='share-buttons'>
        <button onClick={handleFacebookShare}>
            <FontAwesomeIcon icon={faFacebook} />
            Share
        </button>
        <button onClick={handleTwitterShare}>
            <FontAwesomeIcon icon={faTwitter} />
            Tweet
        </button>
        <button onClick={handleCopyLink}>
            <FontAwesomeIcon icon={faCopy} />
            {copied ? `Link Copied!` : `Copy Link`}
        </button>
        </div>
    );
};

export default ShareButtons;
