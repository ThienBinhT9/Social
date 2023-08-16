import classNames from "classnames/bind";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({type, to, href, small, large, primary, text, disible = false, children, className, iconRight, iconLeft, onClick, onSubmit, ...passProps}) {

    let Comp = 'button'

    const props = {
        onClick,
        onSubmit,
        ...passProps
    }

    if(to){
        Comp = Link
        props.to = to
    }
    else if(href){
        Comp = 'a'
        props.href = href
    }

    const classes = cx('wrapper', {
        [className]: className,
        small,
        large,
        primary,
        text,
        disible
    })

    return ( 
        <Comp className={classes} {...props}>
            {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
            <span>{children}</span>
            {iconRight && <FontAwesomeIcon icon={iconRight} />}
        </Comp>
    );
}

export default Button;