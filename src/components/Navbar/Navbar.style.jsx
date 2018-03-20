import styled from 'styled-components';
import media from 'theme/media';

export const NavbarBrandStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    

    &&& {
        margin: 0;
    }

    .mainLogo {
        text-align: right;
        line-height: 0;
        display: inline-grid;
    }


    .smallLogo {
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        display: none;
    }

    ${media.tablet`
        margin: 0 auto;
        width: 70%;
        .smallLogo {
            display: inline
        }
    `}
    ${media.phone`
        .mainLogo {
            display: none;
        }
    `}
`;

export const SocialUl = styled.ul`
    
    li {
        padding: 0 20px;
        i {
            font-size: 30px;
        }
    }
    ${media.tablet`
        flex-direction: row !important;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        
    `}
`;

export const MenuUl = styled.div`
    width:100%;
    ${media.tablet`
        text-align: center;
        ul{
            margin-top: 20px;
        
            li {
                display: flex;
                justify-content: center;
                align-items: center;
    
                a {
                    width: 50%;
                }
            }
        }
    `}
li {
    a {
        position: relative;
    
        &::after{
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 1px;
            background: #fff;
            content: '';
            opacity: 0;
            -webkit-transition: height 0.3s, opacity 0.3s, -webkit-transform 0.3s;
            -moz-transition: height 0.3s, opacity 0.3s, -moz-transform 0.3s;
            transition: height 0.3s, opacity 0.3s, transform 0.3s;
            -webkit-transform: translateY(-10px);
            -moz-transform: translateY(-10px);
            transform: translateY(-10px);
        }  
        &:hover::after,
        &:focus::after {
        height: 5px;
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        transform: translateY(0px);
        }
        
    }
    .active::after {
        height: 5px;
        opacity: 1;
        margin-top: 5px;
    }

}
`;

export const MenuAfterLogIn = styled.div`
    width: 100%;
    display: flex;

    .LogoutButton {
        background:none!important;
        color:inherit;
        border:none; 
        padding:0!important;
        font: inherit;
        cursor: pointer;
    }
`;