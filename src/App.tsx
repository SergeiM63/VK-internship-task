import './App.css';
import Select from 'react-select';
import {
  useForm,
  SubmitHandler,
  Controller
} from "react-hook-form";

// Башни А и Б
const towers = [
  {
    value: 'Башня А',
    label: 'Башня А'
  },
  {
    value: 'Башня Б',
    label: 'Башня Б'
  },
];

// Получаем массив этажей с 3 по 27
const firstLevel = 3;
const lastLevel = 28;

const levels = Array.from(
  Array(lastLevel).keys()
)
.slice(firstLevel)
.map(level => {
  return {
    value: level.toString(),
    label: level.toString()
  }
});

// Получаем массив комнат с 1 по 10
const firstRoom = 1;
const lastRoom = 11;

const rooms = Array.from(
  Array(lastRoom).keys()
)
.slice(firstRoom)
.map(level => {
  return {
    value: level.toString(),
    label: level.toString()
  }
});

type optionsType = {
  value: string, label: string
}

type FormValues = {
  currentTower: string,
  currentLevel: string,
  currentRoom: string,
  date: string,
  comments: string,
  value: string,
};

export default function App() {
  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid}
  } = useForm<FormValues>();

  const getValue = (value:string, options: optionsType[]) => {
    return value ? options.find(option => option.value === value) : '';
  };

  const getMinDate = () => {
    return new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); 
    
    // console.log(JSON.stringify(data));
    resetAll();
  }

  const resetAll = () => {
    reset();
    (
      document.querySelector("input[type='datetime-local']"
    ) as HTMLTextAreaElement).value = '';

    (
      document.querySelector('textarea'
    ) as HTMLTextAreaElement).value = '';
  }

  return (
    <div className='App'>
      <form
        className='Form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Форма бронирования переговорной </h1>
        
        <Controller
          control={control}
          name='currentTower'
          rules={
            {
              required: "Выберете башню"
            }
          }
          render={({field: {onChange, value}}) =>
            <Select
              className='Form__select'
              placeholder='Выберете башню'
              onChange={newValue => onChange(newValue)}
              value={getValue(value, towers)}
              options={towers}
            />
          }
        />

        <Controller
          control={control}
          name='currentLevel'
          rules={
            {
              required: "Выберете этаж"
            }
          }
          render={({field: {onChange, value}}) =>
            <Select
              className='Form__select'
              placeholder='Выберете этаж'
              onChange={newValue => onChange(newValue)}
              value={getValue(value, levels)}
              options={levels}
            />
          }
        />

        <Controller
          control={control}
          name='currentRoom'
          rules={
            {
              required: "Выберете переговорную"
            }
          }
          render={({field: {onChange, value}}) =>
            <Select
              className='Form__select'
              placeholder='Выберете переговорную'
              onChange={newValue => onChange(newValue)}
              value={getValue(value, rooms)}
              options={rooms}
            />
          }
        />

        <Controller
          control={control}
          name='date'
          render={({field: {onChange, value}}) =>
            <input
              className='Form__input-date'
              type='datetime-local'
              onChange={newValue => onChange(newValue)}
              value={value}
              min={getMinDate()}
            />
          }
        />

        <Controller
          control={control}
          name='comments'
          render={({field: {onChange, value}}) =>
            <textarea
              placeholder='Комментарий...'
              className='Form__textarea'
              onChange={newValue => onChange(newValue)}
              value={value}
            ></textarea>
          }
        />

        <div className='Form__btn-wrapper'>
          <button
            className='Form__btn-submit'
            type='submit'
            disabled={!isValid && true}
          >
            Отправить
          </button>
          <button
            className='Form__btn-reset'
            type='button'
            onClick={() => resetAll()}
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
}