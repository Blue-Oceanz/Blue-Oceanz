import { useState,useEffect } from 'react';
import styles from './Topbar.module.css';
import { Link } from 'react-router-dom';
import Button from 'Shared/components/Button/Button';
import { GoMegaphone } from 'react-icons/go';
import { RiNewspaperLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);

    const dropDownHandler = () => {
        setShowMenu(!showMenu);
    };
    useEffect(()=>{
        const closeDropDown = e => {
            console.log(e.path[0].tagName)
            if (e.path[0].tagName ==='DIV'||e.path[0].tagName==="NAV") {
                setShowMenu(false)
            }
        }
        document.body.addEventListener('click', closeDropDown)
        return () => document.body.removeEventListener('click', closeDropDown)
    }, [])
    

    return (
        <div className={styles.dropdown}>
            <Button      
                icon={<GiHamburgerMenu size={40} color={'white'}/>} 
                onClick={dropDownHandler}>
            </Button>
            {showMenu && (
                <div className={styles.dropdownMenu}>
                        <Link to={'/applications'}>
                            <Button
                                icon={<RiNewspaperLine size={30} color={'rgb(60, 64, 67)'} />}
                                text="Applications"
                                textColor="rgb(60, 64, 67)"
                            />
                        </Link>
                        <Link to={'/opportunities'}>
                            <Button
                                icon={<GoMegaphone size={30} color={'rgb(60, 64, 67)'} />}
                                text="Opportunities"
                                textColor="rgb(60, 64, 67)"
                            />
                        </Link>
                </div>
            )}
        </div>
    );
}