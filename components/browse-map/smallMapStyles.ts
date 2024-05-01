import { lightBlueTheme } from "./map-themes/lightBlue";

export const mapStyles = lightBlueTheme;

export const smallContainerStyles = {
  width: "100%",
  minHeight: "50vh",
  borderRadius: "1rem",
  overflow: "hidden",
  border: "1px solid #e5e7eb",
};

export const mapOptions = {
  disableDoubleClickZoom: true,
  styles: mapStyles,
};
