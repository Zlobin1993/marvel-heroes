import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { object, string } from 'yup';

import Spinner from '../spinner/Spinner';

import useMarvelService from '../../services/MarvelService';

import './characterSearchForm.scss';

const CharacterSearchForm = () => {
  const [character, setCharacter] = useState(null);
  const { isLoading, error, clearError, getCharacterByName } = useMarvelService();

  const onCharacterLoaded = character => {
    setCharacter(character);
  }

  const updateCharacter = name => {
    clearError();

    getCharacterByName(name)
      .then(onCharacterLoaded);
  }

  const results = character && character.name
    ? (
      <>
        <p className="character-search-form__message character-search-form__message--success">Character found. Visit {character.name} page?</p>

        <p className="character-search-form__message">
          <Link
            className="button"
            to={`/${character.name}`}
          >
            To page
          </Link>
        </p>
      </>
    )
    : character !== null
      ? <p className="character-search-form__message character-search-form__message--error">The character was not found. Check the name and try again.</p>
      : null;

  return (
    <div className="character-search-form character-info__search-form">
      <Formik
        initialValues={{
          name: '',
        }}

        validationSchema={object({
          name: string().required('This field is required!'),
        })}

        onSubmit={({ name }) => {
          updateCharacter(name);
        }}
      >
        {() => (
          <Form>
            <label
              className="character-search-form__label"
              htmlFor="name"
            >
              Find character direct page by name:
            </label>

            <div className="character-search-form__wrapper">
              <Field
                type="text"
                name="name"
                id="name"
                className="character-search-form__input"
              />

              <button
                type="submit"
                className="button character-search-form__button"
                disabled={isLoading}
              >
                {isLoading ? <Spinner type='white' size='small' /> : 'Find'}
              </button>
            </div>

            <FormikErrorMessage
              className="character-search-form__message character-search-form__message--error"
              name="name"
              component="p"
            />
          </Form>
        )}
      </Formik>

      {results}
      {error && <p className="character-search-form__message character-search-form__message--error">Can't check your character for now. Try again later.</p>}
    </div>
  );
}

export default CharacterSearchForm;
