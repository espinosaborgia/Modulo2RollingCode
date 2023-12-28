const SwalAlerts = {
  error: (text) =>
    Swal.fire({
      title: "Ocurrió un error!",
      text: text,
      icon: "error",
      confirmButtonText: "Ok",
    }),
  succes: (text, title) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonText: "Ok",
    });
  },
};

export { SwalAlerts };
