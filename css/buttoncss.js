import { Platform } from "react-native"
export const buttonContainer = {
    marginTop: 50,
    paddingVertical: 50,
    paddingHorizontal: 30,
    marginBottom: 50,
}
export const button1 = {
    ...Platform.select({
        ios: {
            borderRadius: 15,
            padding: 10,
            overflow: "hidden",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: '100%',
            fontSize: 17,
            fontWeight: "700",
            backgroundColor: "#326370",
            color: "#fff",
        },
        android: {
            borderRadius: 15,
            padding: 10,
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: '100%',
            fontSize: 17,
            fontWeight: "700",
            backgroundColor: "#326370",
            color: "#fff",
        },
    }),

}
