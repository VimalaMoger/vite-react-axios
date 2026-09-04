import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


export default function FooterComponent() {
    return (
        <footer className="flex items-center justify-center gap-2">
            Built with <FontAwesomeIcon icon ={faHeart} className="h-18 w-18 text-red-500" aria-hidden="true"/> 
            by <a className="text-rose-950 font-semibold no-underline duration-300 motion-reduce::duration-0" href="https://easybytes.com/" target="_blank" rel="noreferrer">eazybytes</a>
        </footer>
    );
}