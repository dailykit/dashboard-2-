import styled from "styled-components";

export const Styles = {
   Header: styled.header`
    background: #04a777;
    display: flex;
    align-items: center;
  `,
   Auth: styled.button`
   border-radius: 0.25rem;
   padding-left: 0.75rem;
   padding-right: 0.75rem;
   height: 2rem;


   &.ghost {
      --tw-text-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
      :hover{--tw-bg-opacity: 1;
      background-color: rgba(4, 120, 87, var(--tw-bg-opacity));}
    }
    &.solid {
      --tw-bg-opacity: 1;
      --tw-text-opacity: 1
      background-color: rgba(4, 120, 87, var(--tw-bg-opacity));
      color: rgba(255, 255, 255, var(--tw-text-opacity));
      :hover{
         --tw-bg-opacity: 1;
         background-color: rgba(6, 95, 70, var(--tw-bg-opacity));
      }}`,

   Menu: styled.button`
   width: 40px;
   height: 40px;
   display: flex;
   cursor: pointer;
   align-items: center;
   justify-content: center;
   :hover,
   :focus {
    background: #048e65;
   }
  `,
   Nav: styled.div`
    display: flex;
    border-left: 1px solid #048e65;
  `,
   Button: styled.button`
    background: transparent;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover,
    :focus {
      background: #048e65;
    }
    svg {
      display: unset;
    }
  `,
};
