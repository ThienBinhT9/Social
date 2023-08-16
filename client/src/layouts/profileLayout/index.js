import { useEffect } from 'react';
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Row from '../../components/Grid/Row'
import Col from '../../components/Grid/Col'
import classNames from 'classnames/bind';

import styles from './profileLayout.module.scss'
import NavMobile from '../components/NavMobile'

const cx = classNames.bind(styles)

function MainLayout({children}) {
    const user = useSelector(state => state.auth.login?.currentUser)
    const navigate = useNavigate()

    useEffect(() => {
        if(user?.accessToken === undefined) {
            return navigate('/login')
        }
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <NavMobile />
            <div className={cx('container')}>
                <Row>
                    <Col l={3} s={'none'}><Nav /></Col>
                    <Col l={9} s={12}>
                        <div className={cx('content')}>
                            <Row>
                                <Col l={1} s={'none'}></Col>
                                <Col l={8} s={12}>{children}</Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default MainLayout;