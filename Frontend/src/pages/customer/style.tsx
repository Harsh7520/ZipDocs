import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../constant/constant";

const createAccountStyle = makeStyles((theme) => ({
  createAccountWrapper: {
    "& .create-account-page-wrapper": {
      padding: "42px 0 80px",
      "@media (max-width: 991px)": {
        padding: "35px 0 50px",
      },
      "& .login-row": {
        display: "flex",
        justifyContent: "center",
        margin: "0 0px",
        "@media (max-width: 767px)": {
          flexWrap: "wrap",
        },
        "& p": {
          color: colors.lightTextColor,
          fontWeight: 300,
          fontSize: "15px",
          marginBottom: "16px",
          "&.text-danger": {
            fontSize: "14px",
            color: colors.primary,
            position: "absolute",
            top: "70%",
            margin: "0",
          },
        },
        "& .content-col": {
          maxWidth: "50%",
          flex: "0 0 50%",
          padding: "0 15px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          "@media (max-width: 767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .btn-wrapper": {
            marginTop: "10px",
            "@media (max-width: 767px)": {
              marginTop: "30px",
            },
          },
        },
        "& .form-block": {
          maxWidth: "50%",
          flex: "0 0 50%",
          padding: "0 15px",

          "@media (max-width: 767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            marginTop: "35px",
          },
          "& .MuiInputBase-formControl": {
            marginBottom: "35px",
            width: "50%"
          },
          "& .form-row-wrapper": {
            maxWidth: "390px",
            width: "20%",
            "@media (max-width: 767px)": {
              maxWidth: "100%",
            },
            "& .form-col": {
              position: "relative",
              width: "20%"
            },
          },
          "& .forgot-password-link": {
            color: colors.primary,
            fontWeight: "300",
          },
          "& .btn-wrapper": {
            marginTop: "25px",
            "& .btn": {
              minWidth: "110px",
              padding: "0 15px",
              "@media (max-width: 767px)": {
                fontSize: "18px",
              },
            },
          },
        },
      },
      "@media (max-width: 767px)": {
        padding: "35px 0 40px",
      },
      "& .create-account-row": {
        "& .personal-information": {
          marginBottom: "32px",
        },
        "& p": {
          color: colors.lightTextColor,
          fontWeight: 300,
          fontSize: "15px",
          marginBottom: "16px",
        },
        "& .backlink": {
          color: colors.primary,
          fontWeight: "300",
        },

        "& .btn-wrapper": {
          marginBottom: "15px",
          marginTop: "17px",
          "& .btn": {
            minWidth: "136px",
            padding: "0 15px",
          },
        },
        "& .form-row-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -15px",
          "& .form-col": {
            padding: " 0 15px",
            maxWidth: "50%",
            flex: "0 0 50%",
            "@media(max-width:767px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "&.full-width": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
          },
          "& .MuiInputBase-formControl": {
            marginBottom: "15px",
          },
        },
      },
    },
  },
}));

export { createAccountStyle };
