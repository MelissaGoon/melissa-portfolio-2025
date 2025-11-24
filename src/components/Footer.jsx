import { useState } from 'react';
import styles from '../styles/modules/footer.module.css'
const Footer = () => {
    const [emailCopied, setEmailCopied] = useState(false);

    function handleEmailCopy() {
        navigator.clipboard.writeText("contact@melissagoon.dev")
            .then(() => {
                setEmailCopied(true);
            })
            .catch(err => {
                console.error("Failed to copy email:", err);
            });
    }

    return (
        <footer id="footer" className={styles.footer_wrapper}>
            <div className={styles.footer}>
                <h2>&lt; ContactMe / &gt;</h2>

                <p className={styles.blurb}>Thanks for stopping by! If you have a question, are interested in working with me, or just want to say hi, feel free to connect through the links below!</p>

                <button onClick={handleEmailCopy} className={`${styles.email_copy_btn} ${emailCopied ? styles.copied : ""}`}>
                    {emailCopied ? "✦ Email copied! ✦" : "Click to copy my email!"}
                </button>



                <div className={styles.social_links}>
                    <a href="https://github.com/MelissaGoon" target="_blank" rel="noopener noreferrer">
                        <span className="screen-reader-text">Open my Github profile</span>
                        <svg focusable="false" aria-hidden="true" width="84" height="82" viewBox="0 0 84 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.6648 1.04119e-08C51.5589 -0.000221072 61.1301 3.52034 68.6658 9.93169C76.2015 16.343 81.2098 25.2267 82.7945 34.993C84.3792 44.7593 82.4369 54.7708 77.3151 63.236C72.1933 71.7012 64.2263 78.0675 54.8398 81.1958C52.7565 81.5625 51.9773 80.3125 51.9773 79.2166C51.9773 78.2291 52.0273 74.9458 52.0273 71.4583C62.4982 73.3833 65.2065 68.9041 66.0398 66.5625C66.9648 64.2826 68.4306 62.262 70.3107 60.675C71.769 59.8958 73.8523 57.9666 70.3648 57.9166C69.0319 58.0605 67.7533 58.5239 66.6377 59.2674C65.5221 60.0109 64.6023 61.0126 63.9565 62.1875C63.3868 63.2111 62.6207 64.1123 61.7021 64.8393C60.7834 65.5664 59.7304 66.105 58.6032 66.4243C57.4761 66.7437 56.297 66.8374 55.1335 66.7003C53.9701 66.5631 52.8451 66.1977 51.8232 65.625C51.6442 63.5053 50.6992 61.5234 49.1648 60.05C58.4357 59.0083 68.1232 55.4166 68.1232 39.4791C68.1788 35.338 66.6512 31.3318 63.8523 28.2792C65.1235 24.6797 64.9745 20.7309 63.4357 17.2375C63.4357 17.2375 59.9482 16.1458 51.9773 21.5083C45.1594 19.6337 37.9619 19.6337 31.144 21.5083C23.1773 16.0917 19.6857 17.2375 19.6857 17.2375C18.1468 20.7309 17.9978 24.6797 19.269 28.2792C16.4591 31.325 14.9297 35.3357 14.9982 39.4791C14.9982 55.4666 24.7398 59.0083 34.0065 60.05C33.0133 61.0585 32.2485 62.2687 31.764 63.5987C31.2794 64.9287 31.0865 66.3472 31.1982 67.7583C31.1982 73.3333 31.2482 77.8125 31.2482 79.2166C31.2482 80.3125 30.469 81.6125 28.3857 81.1958C19.0165 78.0413 11.0732 71.6599 5.97387 63.1906C0.874512 54.7213 -1.04904 44.7154 0.546555 34.9591C2.14216 25.2027 7.15307 16.331 14.6848 9.92741C22.2165 3.52387 31.7789 0.00537526 41.6648 1.04119e-08Z" fill="#101010" />
                        </svg>
                    </a>

                    <a href="https://www.linkedin.com/in/melissagoon" target="_blank" rel="noopener noreferrer">
                        <span className="screen-reader-text">Open my LinkedIn profile</span>

                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.0953 0C25.9272 0 26.7251 0.330495 27.3134 0.918779C27.9017 1.50706 28.2322 2.30495 28.2322 3.13691V25.0953C28.2322 25.9272 27.9017 26.7251 27.3134 27.3134C26.7251 27.9017 25.9272 28.2322 25.0953 28.2322H3.13691C2.30495 28.2322 1.50706 27.9017 0.918779 27.3134C0.330495 26.7251 0 25.9272 0 25.0953V3.13691C0 2.30495 0.330495 1.50706 0.918779 0.918779C1.50706 0.330495 2.30495 0 3.13691 0H25.0953ZM24.311 24.311V15.9982C24.311 14.6421 23.7723 13.3416 22.8134 12.3827C21.8545 11.4238 20.554 10.8851 19.1979 10.8851C17.8647 10.8851 16.3119 11.7007 15.5591 12.9241V11.1831H11.1831V24.311H15.5591V16.5786C15.5591 15.3708 16.5315 14.3827 17.7392 14.3827C18.3216 14.3827 18.8801 14.6141 19.2919 15.0259C19.7037 15.4377 19.9351 15.9962 19.9351 16.5786V24.311H24.311ZM6.0856 8.7206C6.78445 8.7206 7.45467 8.44299 7.94883 7.94883C8.44299 7.45467 8.7206 6.78445 8.7206 6.0856C8.7206 4.62694 7.54426 3.43491 6.0856 3.43491C5.3826 3.43491 4.70838 3.71418 4.21128 4.21128C3.71418 4.70838 3.43491 5.3826 3.43491 6.0856C3.43491 7.54426 4.62694 8.7206 6.0856 8.7206ZM8.26575 24.311V11.1831H3.92113V24.311H8.26575Z" fill="#101010" />
                        </svg>
                    </a>

                </div>

                <p className={styles.copyright}>© Melissa Goon {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer