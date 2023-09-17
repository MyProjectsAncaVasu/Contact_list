import clsx from 'clsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

export function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    contact: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    city: '',
    contact: '',
  });

  const [tableData, setTableData] = useState([]);

  function handleInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newData = (data) => [...data, formData];
    setTableData(newData);

    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
  }

  const handleDelete = (row) => {
    tableData.splice(row, 1);
    setTableData([...tableData]);
  };

  // const newItems = tableValues.filter(
  //   (tableValue) => tableValue.id !== index
  // );
  // setTableValues(newItems);
  // };

  const addItem = (row) => {
    tableData.push(row);
    setTableData([...tableData]);
  };

  const editTableData = (row) => {
    const updatedTableData = tableData.map((cell) => {
      if (cell === row) {
        return { ...cell, editing: true };
      }
      return cell;
    });
    setTableData(updatedTableData);
  };

  const saveTableData = (row) => {
    const updatedTableData = tableData.map((cell) => {
      if (cell === row) {
        return { ...cell, editing: false };
      }
      return cell;
    });
    setTableData(updatedTableData);
  };

  tableData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    } else return 0;
  });

  console.log();

  const rows = tableData.map((row, index) => (
    <tr
      key={index}
      className=" ml-0 mr-0 grid grid-cols-8 text-center border-2"
    >
      <td>{index + 1}</td>
      {!row.editing && <td>{row.name}</td>}
      {row.editing && (
        <td>
          <input
            type="text"
            value={row.name}
            onChange={(e) => {
              tableData[index].name = e.target.value;
              setTableData([...tableData]);
            }}
          />
        </td>
      )}

      <td>{row.email}</td>

      {!row.editing && <td>{row.city}</td>}
      {row.editing && (
        <td>
          <input
            type="text"
            value={row.city}
            onChange={(e) => {
              tableData[index].city = e.target.value;
              setTableData([...tableData]);
            }}
          />
        </td>
      )}

      {!row.editing && <td>{row.contact}</td>}
      {row.editing && (
        <td>
          <input
            type="text"
            value={row.contact}
            onChange={(e) => {
              tableData[index].contact = e.target.value;
              setTableData([...tableData]);
            }}
          />
        </td>
      )}

      <td>
        {!row.editing && (
          <button className="edit-button" onClick={() => editTableData(row)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
        {row.editing && (
          <button
            className="save-button text-blue-700"
            onClick={() => saveTableData(row)}
          >
            Save
          </button>
        )}
      </td>
      <td>
        <button
          className="btn btn-outline-danger "
          onClick={() => handleDelete(index)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>

      <td>
        <button
          className="btn btn-outline-danger "
          onClick={() => addItem(index)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </td>
    </tr>
  ));

  if (!formData) {
    return <strong>Loading ...</strong>;
  }
  return (
    <>
      <div>
        <div className="  rounded border-2 mt-10 mr-40 ml-40  bg-orange-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <h2 className="ml-60 mt-10 text-blue-600 font-bold">
            Hello, {formData.name}
          </h2>
          <form action="" className="ml-40 mr-40 " onSubmit={handleSubmit}>
            <div
              className={clsx('rounded border-gray border-2 bg-white mt-8 ', {
                'border-red-800': errors.city,
              })}
            >
              <label htmlFor="city" className="ml-2">
                City:
              </label>
              <input
                className={clsx(' ml-8  ')}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInput}
              />
            </div>
            {errors.city && <p className="mt-1  text-red-800">{errors.city}</p>}
            <div
              className={clsx('rounded border-grey border-2 bg-white mt-3 ', {
                'border-red-800': errors.name,
              })}
            >
              <label htmlFor="name" className="ml-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className={clsx('ml-5 ')}
                value={formData.name}
                onChange={handleInput}
              />
            </div>
            {errors.name && <p className="mt-1  text-red-800">{errors.name}</p>}
            <div
              className={clsx('rounded border-grey border-2  bg-white mt-3 ', {
                'border-red-800': errors.email,
              })}
            >
              <label htmlFor="email" className="ml-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className={clsx('ml-6 ')}
                value={formData.email}
                onChange={handleInput}
              />
            </div>
            {errors.email && (
              <p className="mt-1  text-red-800">{errors.email}</p>
            )}
            <div
              className={clsx('rounded border-grey border-2 bg-white mt-3 ', {
                'border-red-800': errors.contact,
              })}
            >
              <label htmlFor="contact" className="ml-2">
                Contact:
              </label>
              <input
                type="number"
                name="contact"
                className={clsx('ml-2 ')}
                value={formData.contact}
                onChange={handleInput}
              />
            </div>
            {errors.contact && (
              <p className="mt-1 text-red-800">{errors.contact}</p>
            )}
            <button
              type="submit"
              className="rounded  bg-teal-100 text-black  text-l border-4 mb-4 font-semibold  mt-6"
              onClick={() => {
                console.log(formData);
              }}
            >
              Adauga Contact
            </button>
          </form>
        </div>
        <output>
          {/* {formData.name !== '' && <p>Your name is: {formData.name}</p>}
          {formData.email !== '' && <p>Your email is: {formData.email}</p>}
          {formData.contact !== '' && <p>Your email is: {formData.contact}</p>} */}
          {/* {contact !== '' && <p>Your contact is: {contactAsNumber}</p>} */}

          <div className="mr-20 ml-20">
            <h3 className=" rounded bg-gray-400 text-center text-xl font-bold  border-6 mt-10 mr-8 ml-8">
              Lista studentilor
            </h3>
            <table className=" rounded   mt-6  mr-8 mb-10  ml-8 text-center  border-4 grid ">
              <thead>
                <tr className="  grid  grid-cols-8 bg-gray-100">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Contact</th>
                  <th className="text-blue-600">EditItem</th>
                  <th className="text-blue-600">Delete</th>
                  <th className="text-blue-600">AddItem</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </output>
      </div>
    </>
  );
}

function validateForm(formData) {
  const validation = {
    errors: {
      name: '',
      email: '',
      city: '',
      contact: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!formData.email || !emailRegex.test(formData.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid email address';
  }

  if (!formData.name) {
    validation.isValid = false;
    validation.errors.name = 'Please enter your  name.';
  }

  if (!formData.city) {
    validation.isValid = false;
    validation.errors.city = 'Please enter your city.';
  }

  if (!formData.contact) {
    validation.isValid = false;
    validation.errors.contact = 'Please enter your contact.';
  }
  return validation;
}
