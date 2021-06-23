import styled, { css } from 'styled-components'

export const Button = styled.button`
--tw-bg-opacity: 1;
background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
text-transform: uppercase; 
font-weight: 500; 
font-size: 0.875rem;
line-height: 1.25rem;
--tw-text-opacity: 1;
color: rgba(255, 255, 255, var( --tw-text-opacity)); 
border-style: none;
padding-left: 1rem;
padding-right: 1rem;
height: 2.5rem;
border-radius: 9999px;
   &:disabled {
      cursor: not-allowed;
      --tw-bg-opacity: 1;
background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
--tw-text-opacity: 1;
color: rgba(107, 114, 128, var(--tw-text-opacity));
   }
`

export const Footer = styled.footer`
   padding: 0 16px;
   grid-area: footer;
   display:flex;
   align-items:center;
   justify-content: space-between;}
`

export const Main = styled.main`
   grid-area: main;
   overflow-y: scroll;
   overflow-x: hidden;
   background: #ffffff;
   margin: 16px 16px 0 16px;
   border: 1px solid #ececec;
`

export const H2 = styled.h2`
   font-size: 20px;
   font-weight: 400;
   color: #555b6e;
   margin-bottom: 24px;
`

export const H4 = styled.h4`
   font-size: 16px;
   font-weight: 400;
   color: #555b6e;
   margin-top: 24px;
   margin-bottom: 14px;
`

export const Form = styled.form`
   width: 320px;
   #terms__label {
      color: #555b6e;
      margin-left: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      a {
         text-decoration: none;
         color: #555b6e;
         font-weight: 500;
         &:hover {
            color: #6e7382;
         }
      }
   }
`

export const Field = styled.div`
margin-bottom: -1.5rem;
margin-top: -0.5rem;
   input {
      font-size: 16px;
      color: #686d7b;
   }
   label {
      margin-bottom: 4px;
   }
   input,
   select {
      width: 320px;
      height: 40px;
      border: none;
      border-bottom: 2px solid #e1e1e1;
      &:focus {
         outline: transparent;
         border-bottom: 2px solid #04a777;
      }
      &:focus,
      &:valid {
         border-bottom: 2px solid #04a777;
         & + label {
            color: #04a777;
            font-size: 12px;
         }
      }
   }
`

export const Label = styled.label`
--tw-text-opacity: 1;
color: rgba(75, 85, 99, var(--tw-text-opacity));
margin-bottom: -0.25rem;
`

export const CheckBoxWrapper = styled.div`
   margin-top: 32px;
   label {
      font-size: 16px;
      color: #888d9d;
      margin-left: 8px;
   }
`

export const Info = styled.div`
   display: flex;
   border-top: 1px solid rgba(0, 0, 0, 0.1);
   margin-top: 32px;
   padding-top: 32px;
   ul {
      padding-left: 32px;
      margin-top: 24px;
      li {
         font-size: 14px;
         color: #555b6e;
         line-height: 24px;
      }
   }
`

export const Tip = styled.div`
   display: flex;
   span {
      margin-right: 16px;
   }
   p {
      font-size: 14px;
      color: #555b6e;
      opacity: 0.7;
      font-style: italic;
   }
`

export const Card = styled.div`
   width: 260px;
   height: 180px;
   display: flex;
   padding: 16px;
   border-radius: 4px;
   text-align: center;
   flex-direction: column;
   border: 1px solid rgba(0, 0, 0, 0.1);
   h4 {
      font-size: 14px;
      margin: 0;
      font-weight: 400;
      color: #888d9d;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
   }
   #strike {
      font-size: 12px;
      text-decoration-line: line-through;
      color: #888d9d;
      margin-top: 16px;
   }
   #discount {
      font-size: 12px;
      font-feature-settings: 'cpsp' on;
      color: #ff8484;
      margin: 8px 0 24px 0;
   }
   #price {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #555b6e;
   }
`
