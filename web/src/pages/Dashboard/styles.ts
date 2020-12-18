import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const animationMoveTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationMoveBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationMoveRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.header`
  animation: ${animationMoveTop} 0.8s;
  p {
    span {
      color: #00e0ff;
      font-weight: 500;
      font-size: 14px;

      &::after {
        content: '|';
        color: #00e0ff;
        padding: 0 8px;
      }

      &:nth-last-child(1) {
        &::after {
          content: '';
        }
      }
    }
  }
`;

export const AppointmentContainer = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1060px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

export const NextAppointment = styled.div`
  background-color: #3e3b47;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 30px;
  transition: margin-left 0.5s;
  position: relative;

  & + button {
    margin-top: 8px;
  }

  &:hover {
    margin-left: 8px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 2px;
    height: 70%;
    background-color: #00e0ff;
  }

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

export const CardList = styled.div`
  background-color: #3e3b47;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  padding: 13px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: margin-left 0.5s;

  & + button {
    margin-top: 8px;
  }

  &:hover {
    margin-left: 8px;
  }

  @media (max-width: 500px) {
    max-width: 100%;
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Content = styled.button`
  background-color: transparent;
  border: 0;

  p {
    font-size: 16px;
    color: #f4ede8;
  }

  strong {
    display: flex;
    align-items: center;
    color: #999591;

    svg {
      color: #00e0ff;
      margin-right: 8px;
    }
  }

  @media (max-width: 500px) {
    p {
      font-size: 14px;
    }
  }
`;

export const Buttons = styled.div`
  button {
    background-color: #f4ede8;
    border-radius: 8px;
    border: 0;
    width: 35px;
    height: 35px;
    line-height: 12px;

    &:hover svg {
      color: #34bf1e;
    }

    svg {
      color: #585858;
      font-size: 20px;
      transition: color 0.2s;
    }

    & + button {
      margin-left: 8px;

      &:hover svg {
        color: #c53030;
      }
    }
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button + button {
      margin-left: 0;
      margin-top: 8px;
    }
  }
`;

export const TitleSchedule = styled.h3`
  color: #999591;
  font-weight: normal;
  font-size: 17px;
  margin: 24px 0 16px 0;
  border-bottom: 1px solid #999591;
  max-width: 400px;
  width: 100%;

  &:nth-last-of-type(4) {
    border-bottom: none;
  }
`;

export const Schedule = styled.main`
  animation: ${animationMoveBottom} 0.8s;
  max-width: 450px;
  width: 100%;
  margin-bottom: 30px;
`;

export const Calendar = styled.aside`
  animation: ${animationMoveRight} 0.8s;
  width: 380px;
  margin-top: 30px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #00e0ff !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  @media (max-width: 500px) {
    width: 100%;

    .DayPicker-Month {
      border-spacing: 6px;
    }

    .DayPicker-Day {
      width: 35px;
      height: 35px;
    }
  }
`;
