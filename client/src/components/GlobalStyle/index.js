import { useSelector } from 'react-redux';
import './globalstyle.scss'

function GlobalStyle({children}) {

    const mode = useSelector(state => state.auth.mode)

    return (
        <div className={mode === 'light' ? " " : 'globaldarkmode'}>
            {children}
        </div>
    );
}

export default GlobalStyle;