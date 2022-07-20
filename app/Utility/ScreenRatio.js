import { Platform, StatusBar, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const standardLength = width > height ? width : height;

export const isIphoneX = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

const deviceHeight = isIphoneX()
    ? standardLength - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === "android"
        ? standardLength - StatusBar.currentHeight
        : standardLength;

export function ScreenRatio(percent) {
    const heightPercent = (percent * width) / 100;
    return Math.round(heightPercent);
}
export function ScreenHeight(percent) {
    const height = (percent * deviceHeight) / 100;
    return Math.round(height);

}
export function ScreenWidth(percent) {
    const widthPercent = (percent * width) / 100;
    return Math.round(widthPercent);

}

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize, standardScreenHeight = 680) {
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
}