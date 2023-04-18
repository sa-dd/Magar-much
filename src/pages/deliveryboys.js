import { useState } from 'react';

const IndexPage = ({ deliveryboys }) => {
  const [form, setForm] = useState({
    Name: '',
    Phone: '',
    AreaCodeID: '',
    Availability: '',
    DeliveryCount: '',
    Rating: '',
    UserName: '',
    Password: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/deliveryboys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const newDeliveryBoy = await res.json();
    setForm({
      Name: '',
      Phone: '',
      AreaCodeID: '',
      Availability: '',
      DeliveryCount: '',
      Rating: '',
      UserName: '',
      Password: '',
    });
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:8080/api/deliveryboys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const updatedDeliveryBoy = await res.json();
    setForm({
      Id: '',
      Name: '',
      Phone: '',
      AreaCodeID: '',
      Availability: '',
      DeliveryCount: '',
      Rating: '',
      UserName: '',
      Password: '',
    });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/deliveryboys/${id}`, {
      method: 'DELETE',
    });
    const deletedDeliveryBoy = await res.json();
  };

  return (
    <div>
      <h1>Delivery Boys List</h1>

      <ul>
        {deliveryboys.map((deliveryboy) => (
          <li key={deliveryboy.Id}>
            <form onSubmit={() => handleUpdate(deliveryboy.Id)}>
              <label>
                Name
                <input
                  type="text"
                  name="Name"
                  value={form.Name || deliveryboy.Name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone
                <input
                  type="text"
                  name="Phone"
                  value={form.Phone || deliveryboy.Phone}
                  onChange={handleChange}
                />
              </label>

              <label>
                AreaCodeID
                <input
                  type="text"
                  name="AreaCodeID"
                  value={form.AreaCodeID || deliveryboy.AreaCodeID}
                  onChange={handleChange}
                />
              </label>

              <label>
                Availability
                <input
                  type="text"
                  name="Availability"
                  value={form.Availability || deliveryboy.Availability}
                  onChange={handleChange}
                />
              </label>

              <label>
                DeliveryCount
                <input
                  type="text"
                  name="DeliveryCount"
                  value={form.DeliveryCount || deliveryboy.DeliveryCount}
                  onChange={handleChange}
                />
              </label>

              <label>
                Rating
                <input
                  type="text"
                  name="Rating"
                  value={form.Rating || deliveryboy.Rating}
                  onChange={handleChange}
                />
              </label>

              <label>
                UserName
                <input
                  type="text"
                  name="UserName"
                  value={form.UserName               || deliveryboy.UserName}
                  onChange={handleChange}
                />
              </label>
    
              <label>
                Password
                <input
                  type="text"
                  name="Password"
                  value={form.Password || deliveryboy.Password}
                  onChange={handleChange}
                />
              </label>
    
              <button type="submit">Update</button>
            </form>
    
            <button onClick={() => handleDelete(deliveryboy.Id)}>Delete</button>
    
            <div>
              <h2>{deliveryboy.Name}</h2>
              <p>Phone: {deliveryboy.Phone}</p>
              <p>AreaCodeID: {deliveryboy.AreaCodeID}</p>
              <p>Availability: {deliveryboy.Availability}</p>
              <p>DeliveryCount: {deliveryboy.DeliveryCount}</p>
              <p>Rating: {deliveryboy.Rating}</p>
              <p>UserName: {deliveryboy.UserName}</p>
              <p>Password: {deliveryboy.Password}</p>
            </div>
          </li>
        ))}
      </ul>
    
      <h1>Add Delivery Boy</h1>
    
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
          />
        </label>
    
        <label>
          Phone
          <input
            type="text"
            name="Phone"
            value={form.Phone}
            onChange={handleChange}
          />
        </label>
    
        <label>
          AreaCodeID
          <input
            type="text"
            name="AreaCodeID"
            value={form.AreaCodeID}
            onChange={handleChange}
          />
        </label>
    
        <label>
          Availability
          <input
            type="text"
            name="Availability"
            value={form.Availability}
            onChange={handleChange}
          />
        </label>
    
        <label>
          DeliveryCount
          <input
            type="text"
            name="DeliveryCount"
            value={form.DeliveryCount}
            onChange={handleChange}
          />
        </label>
    
        <label>
          Rating
          <input
            type="text"
            name="Rating"
            value={form.Rating}
            onChange={handleChange}
          />
        </label>
    
        <label>
          UserName
          <input
            type="text"
            name="UserName"
            value={form.UserName}
            onChange={handleChange}
          />
        </label>
    
        <label>
          Password
          <input
            type="text"
            name="Password"
            value={form.Password}
            onChange={handleChange}
          />
        </label>
    
        <button type="submit">Add</button>
      </form>
    </div>
    );
};

export async function getServerSideProps() {
const res = await fetch('http://localhost:8080/api/deliveryboys');
const deliveryboys = await res.json();
return {
props: { deliveryboys },
};
}

export default IndexPage;