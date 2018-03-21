import styled from 'styled-components';

export const RightMenuExpander = styled.div`
    position: fixed;
    bottom: 20px;
    right: 45px;
    font-size: 30px;
    background-color: #343a40;
    display: flex;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    justify-content: center;
    color: white;

    i {
        &:hover {
            text-shadow: 1px 1px 20px white;
        }
    }
`;