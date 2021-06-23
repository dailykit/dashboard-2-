import styled, { css } from "styled-components";

export const ModalWrapper = styled.div(
  () => css`
    background: rgba(0, 0, 0, 0.2);
    background-attachment: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `
);

export const ModalCard = styled.div(
  () => css`
    width: 720px;
    height: auto;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    border-radius: 0.25rem;
    padding: 0.75rem;
  `
);
