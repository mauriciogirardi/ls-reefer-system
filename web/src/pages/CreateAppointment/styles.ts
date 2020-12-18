import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

interface HourProps {
  available: boolean;
  selected: boolean;
}

const animationMoveTop = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animationMoveBottom = keyframes`
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
  display: flex;
  max-width: 850px;
  margin: 0 auto;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;

  form {
    animation: ${animationMoveBottom} 0.8s;

    max-width: 350px;
    width: 100%;
    margin-top: 50px;

    h3 {
      color: #f4ede8;
      border-bottom: 1px solid #f4ede8;
      display: block;
      margin-bottom: 10px;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 1080px) {
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    form {
      max-width: 100%;
      div {
        width: 100%;
      }

      button {
        width: 100%;
      }
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  width: 100%;
  margin: 0;

  @media (max-width: 500px) {
    flex-wrap: wrap;
    max-width: 100%;
  }
`;

export const Appointment = styled.section`
  max-width: 380px;
  width: 100%;
  animation: ${animationMoveTop} 0.8s;

  h1 {
    margin-bottom: 30px;
    font-size: 24px;
  }
`;

export const ContentHour = styled.div`
  margin-top: 10px;

  strong {
    color: #585858;
    border-bottom: 1px solid #585858;
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 18px;
  }
`;

export const Hour = styled.button<HourProps>`
  display: inline-block;
  background-color: ${props => (props.selected ? '#1aa8be' : '#3e3b47')};
  border: 0;
  margin-right: 8px;
  padding: 5px 10px;
  border-radius: 10px;
  opacity: ${props => (props.available ? 1 : 0.3)};

  p {
    color: ${props => (props.selected ? '#232129' : '#F4EDE8')};
    font-size: 14px;
  }

  @media (max-width: 500px) {
    margin-right: 10px;
    padding: 5px;
  }
`;

export const Calendar = styled.aside`
  width: 380px;

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
