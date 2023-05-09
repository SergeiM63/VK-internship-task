import './App.css';
import { useState } from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler } from "react-hook-form";

const options = [
  { value: 'Башня А', label: 'Башня А' },
  { value: 'Башня Б', label: 'Башня Б' },
];

//Удаление пробелов из поля ввода
const deleteSpaces = (value: string) => {
  return value.replace(/\s/g, '');
};

//Удаление пробелов и цифр из поля ввода
const deleteSpacesAndFigures = (value: string) => {
  return value.replace(/\s/g, '').replace(/\d/g, '');
};

type FormValues = {
  firstName: string;
  lastName: string;
};

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    reset, 
    formState: {errors, isValid}
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(JSON.stringify(data));
    reset();
  }

  return (
    <div className='App'>
      <form
        className='Form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Форма бронирования переговорной </h1>

        <Select
          className='Form__select'
          placeholder='Выберете башню'
          defaultValue={selectedOption}
          onChange={() => setSelectedOption}
          options={options}
        />

        <div>
          <button
            type="submit"
            disabled={!isValid && true}
          >
            Отправить
          </button>
          <button
            type='button'
            onClick={() => reset()}>Очистить форму</button>
        </div>
      </form>
    </div>
  );
}