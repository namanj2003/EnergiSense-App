import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
export const topNav = {
    ...Platform.select({
        ios: {
            width: "100%",
            height: height * 0.12,
            backgroundColor: "#20212e",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        android: {
            width: "100%",
            height: 74,
            backgroundColor: "#20212e",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
    }),

};

export const navText = {
    ...Platform.select({
        ios: {
            fontSize: 30,
            color: "#ffa840",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: height * 0.05,
        },
        android: {
            fontSize: 30,
            color: "#ffa840",
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
        },
    }),

};

export const navIconContainer = {
    position: "absolute",
};

export const navIcon = {
    ...Platform.select({
        ios: {
            marginTop: height * 0.04,
        },
        android: {
            marginTop:5,
        },
    }),
};
