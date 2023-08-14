//para limpiar el formulario luego de enviarlo
export const cleanForm=(setInputsForm, setSelectedTemperaments)=>{
    setInputsForm({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeMin: '',
        lifeMax: '',
      });
      setSelectedTemperaments([]);
};

