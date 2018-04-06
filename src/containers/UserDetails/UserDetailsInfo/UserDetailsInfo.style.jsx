import styled from 'styled-components';

export const UserDetailsInfoDiv = styled.div`
background-color: #2c2c36;
padding: 20px 40px;

ul{
    margin: 0;
    padding: 0;
    li {
        list-style: none;
    
        &:nth-child(odd) {
            font-size: xx-large;
        }
    
        &:nth-child(even) {
            margin-bottom: 20px;
        }
    }
}


`;