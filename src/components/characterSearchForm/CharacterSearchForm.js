// import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

// import Spinner from '../spinner/Spinner';

// import useMarvelService from '../../services/MarvelService';

import './characterSearchForm.scss';

const CharacterSearchForm = () => {
  // const { isLoading, error, clearError, getCharacter } = useMarvelService();
  // const [character, setCharacter] = useState(null);

  // useEffect(() => {
  //   updateCharacter();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [characterId])

  // const onCharacterLoaded = character => {
  //   setCharacter(character);
  // }

  // const updateCharacter = () => {
  //   if (!characterId) return;

  //   clearError();

  //   getCharacter(characterId)
  //     .then(onCharacterLoaded)
  // }

  return (
    <div className="character-search-form character-info__search-form">
      <Formik
        initialValues={{
          name: '',
        }}

        validationSchema={object({
          name: string().required('This field is required'),
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label className="character-search-form__label" htmlFor="name">Find character direct page by name:</label>

            <div className="character-search-form__wrapper">
              <Field type="text" name="name" id="name" className="character-search-form__input" />
              <button type="submit" className="button character-search-form__button" disabled={isSubmitting}>Find</button>
            </div>

            <ErrorMessage name="name" className="character-search-form__message" component="p" />
          </Form>
        )}
      </Formik>

      {/* {isLoading && <Spinner />}
      {error && <p className="character-search-form__message">The character was not found. Check the name and try again</p>}
      {(!(isLoading || error) && character) && content} */}
    </div>
  );
}

export default CharacterSearchForm;
