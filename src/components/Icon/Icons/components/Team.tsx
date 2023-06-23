/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TeamProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Team: React.FC<TeamProps> = ({size, ...props}) => (
  <svg viewBox="0 0 20 20" fill="currentColor" width={ size || "20" } height={ size || "20" } {...props}>
    <path d="M6.62178 2.25283C7.02476 2.08591 7.45666 2 7.89284 2C8.32902 2 8.76092 2.08591 9.1639 2.25283C9.56687 2.41975 9.93302 2.6644 10.2414 2.97282C10.5499 3.28125 10.7945 3.6474 10.9614 4.05037C11.1284 4.45335 11.2143 4.88525 11.2143 5.32143C11.2143 5.7576 11.1284 6.18951 10.9614 6.59248C10.7945 6.99546 10.5499 7.36161 10.2414 7.67003C9.93302 7.97846 9.56687 8.22311 9.1639 8.39003C8.76092 8.55695 8.32901 8.64286 7.89284 8.64286C7.45666 8.64286 7.02476 8.55695 6.62178 8.39003C6.21881 8.22311 5.85266 7.97846 5.54423 7.67003C5.23581 7.36161 4.99116 6.99546 4.82424 6.59248C4.65732 6.18951 4.57141 5.7576 4.57141 5.32143C4.57141 4.88525 4.65732 4.45335 4.82424 4.05037C4.99116 3.6474 5.23581 3.28125 5.54423 2.97282C5.85266 2.6644 6.21881 2.41975 6.62178 2.25283ZM7.89284 3.5C7.65365 3.5 7.41679 3.54711 7.19581 3.63865C6.97482 3.73018 6.77403 3.86435 6.6049 4.03348C6.43576 4.20262 6.30159 4.40341 6.21006 4.6244C6.11852 4.84538 6.07141 5.08223 6.07141 5.32143C6.07141 5.56062 6.11852 5.79747 6.21006 6.01846C6.30159 6.23944 6.43576 6.44024 6.6049 6.60937C6.77403 6.77851 6.97482 6.91267 7.19581 7.00421C7.41679 7.09574 7.65365 7.14286 7.89284 7.14286C8.13203 7.14286 8.36888 7.09574 8.58987 7.00421C8.81086 6.91267 9.01165 6.77851 9.18078 6.60937C9.34992 6.44024 9.48409 6.23944 9.57562 6.01846C9.66716 5.79747 9.71427 5.56062 9.71427 5.32143C9.71427 5.08223 9.66716 4.84538 9.57562 4.6244C9.48409 4.40341 9.34992 4.20262 9.18078 4.03348C9.01165 3.86435 8.81086 3.73018 8.58987 3.63865C8.36888 3.54711 8.13203 3.5 7.89284 3.5ZM12.4643 3.5C12.3217 3.50001 12.1796 3.5164 12.0408 3.54887C11.6374 3.64319 11.234 3.39268 11.1397 2.98935C11.0454 2.58602 11.2959 2.18259 11.6992 2.08827C11.95 2.02963 12.2067 2.00001 12.4643 2C13.3452 2 14.19 2.34994 14.8129 2.97282C15.4358 3.59571 15.7857 4.44053 15.7857 5.32143C15.7857 6.20233 15.4358 7.04714 14.8129 7.67003C14.19 8.29292 13.3452 8.64286 12.4643 8.64286C12.2271 8.64277 11.9903 8.61764 11.7584 8.56788C11.3534 8.48099 11.0955 8.08223 11.1824 7.67724C11.2693 7.27224 11.668 7.01437 12.073 7.10126C12.2016 7.12885 12.3328 7.14279 12.4643 7.14286M12.4643 3.5C12.9473 3.50001 13.4106 3.69191 13.7522 4.03348C14.0938 4.37507 14.2857 4.83836 14.2857 5.32143C14.2857 5.8045 14.0938 6.26779 13.7522 6.60937C13.4107 6.95089 12.9473 7.14279 12.4643 7.14286M7.89286 10.3571C6.7278 10.3571 5.61046 10.82 4.78664 11.6438C3.96282 12.4676 3.5 13.5849 3.5 14.75V15.7143H12.2857V14.75C12.2857 13.5849 11.8229 12.4676 10.9991 11.6438C10.1753 10.82 9.05791 10.3571 7.89286 10.3571ZM3.72598 10.5831C4.8311 9.478 6.32997 8.85715 7.89286 8.85715C9.45574 8.85715 10.9546 9.478 12.0597 10.5831C13.1649 11.6883 13.7857 13.1871 13.7857 14.75V16.4643C13.7857 16.8785 13.4499 17.2143 13.0357 17.2143H2.75C2.33579 17.2143 2 16.8785 2 16.4643V14.75C2 13.1871 2.62085 11.6883 3.72598 10.5831ZM12.8476 9.5656C12.9374 9.16125 13.338 8.90629 13.7424 8.99612C15.0515 9.28699 16.2223 10.0157 17.0613 11.0619C17.9003 12.108 18.3574 13.409 18.3571 14.75C18.3571 14.75 18.3571 14.7499 18.3571 14.75V16.4643C18.3571 16.8785 18.0214 17.2143 17.6071 17.2143H15.3214C14.9072 17.2143 14.5714 16.8785 14.5714 16.4643C14.5714 16.0501 14.9072 15.7143 15.3214 15.7143H16.8571V14.75C16.8574 13.7503 16.5166 12.7802 15.8912 12.0003C15.2657 11.2205 14.393 10.6772 13.417 10.4604C13.0127 10.3706 12.7577 9.96996 12.8476 9.5656Z"
      fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
Team.displayName = 'Team';
export default Team;
/* tslint:enable */
/* eslint-enable */
