import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "../../images/nifs_logo.png";
import OAuthService from "../../services/auth/OAuthService";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { RequestStatus } from "../../constant/requestStatus";
import { RouteName } from "../../constant/routeNames";
import { da } from "date-fns/locale";
import { useAppSelector } from "../../redux/hooks";
function ChangePassword() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [confirmError, setConfirmError] = useState("");
  const { user, isLoading, isError, isSuccess, tokenExpireDate } =
    useAppSelector((state: any) => state.auth);

  useEffect(() => {
    if (user === null) {
      navigate(RouteName.Login);
    }
  }, []);
  const onSubmit: SubmitHandler<any> = (data) => {
    //chaeck passwords match or not
    data.epfNo = parseInt(data.epfNo);
    // console.log(data);

    if (data.confirmPassword !== data.newPassword) {
      toast.error("Password is not match!");
      setConfirmError("Password is not match");
      return;
    } else {
      setConfirmError("");
      setTimeout(async () => {
        const result = await dispatch(changePassword(reqData));
        if (result?.status === RequestStatus.SUCCESS) {
          //redirect to login page
          toast.success(result?.message);
          localStorage.removeItem("persist:employee");

          navigate(RouteName.Login);
        } else {
          toast.error(result.message);
        }
      }, 1000);
    }
  };
  return (
    <div className="w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto p-6 my-10 bg-white mx-auto rounded-lg">
      <div className="w-full h-100">
        <img src={Logo} alt="logo" className="login-logo" />
        <p className="mt-2 text-sm text-center md:text-md text-sky-500">
          National Institute of Fundamental Studies
        </p>

        <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
          Change your Password here.
        </h1>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="input-label">EPF Number</label>
            <input
              type="text"
              {...register("epfNo")}
              placeholder="Enter EPF Number"
              className="tailwind-text-box w-[100%]"
              required
            />
          </div>

          <div className="mt-4">
            <label className="input-label">Old Password</label>
            <input
              type="password"
              {...register("oldPassword")}
              placeholder="Enter Password"
              className="tailwind-text-box w-[100%]"
              required
            />
          </div>
          <div className="mt-4">
            <label className="input-label">New Password</label>
            <input
              type="password"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "Password should contains more than 6 characters",
                },
              })}
              placeholder="Enter Password"
              className="tailwind-text-box w-[100%]"
              required
            />
            {errors.newPassword?.type === "minLength" && (
              <ErrorMessage
                msg={"Password should contains more than 6 characters"}
              />
            )}
          </div>

          <div className="mt-4">
            <label className="input-label">ReEnter New Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="ReEnter Password"
              className="tailwind-text-box w-[100%]"
              required
            />
            {confirmError && <ErrorMessage msg={confirmError} />}
          </div>

          <button
            type="submit"
            className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
