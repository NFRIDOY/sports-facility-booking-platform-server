// import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req, res) => {
    const result = await AuthServices.register(req.body);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: result,
    });
});

const login = catchAsync(async (req, res) => {
    const { accessToken, user } = await AuthServices.login(req.body);

    // res.cookie("token", "Bearer" + accessToken, {
    res.cookie("Authorization", accessToken, {
        httpOnly: true,
        secure: true,
        // secure: config.NODE_ENV === "production",
    });

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        token: accessToken,
        data: user,
    });
});

export const authControllers = {
    register,
    login,
};
