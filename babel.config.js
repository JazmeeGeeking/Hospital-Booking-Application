module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./HospitalAppointmentApp'],
          alias: {
            '@': './HospitalAppointmentApp',
            '@components': './HospitalAppointmentApp/components',
            '@constants': './HospitalAppointmentApp/constants',
            '@hooks': './HospitalAppointmentApp/hooks',
            '@services': './HospitalAppointmentApp/services',
            '@types': './HospitalAppointmentApp/types'
          }
        }
      ]
    ]
  };
}; 