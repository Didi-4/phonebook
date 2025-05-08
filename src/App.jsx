import { useState,useEffect } from "react";
import phonebook from './service/phonebook';
import './App.css';


const App = ()=>{
        const [contacts, setContacts] = useState([]);
        const [contactName, setContactName] = useState('');
        const [showDetail, setShowDetail] = useState(false);
        const [detail, setDetail] = useState([]);
        const [contactNumber, setContactNumber] = useState('');
        const [message, setMessage] = useState(null)

// useEffect for axios
        useEffect(()=>{
            phonebook
            .getData()
            .then(contactData =>{
                setContacts(contactData);
                console.log('Contact API fetched successfully')
            })
            .catch(error =>{
                console.log('Error fetching contact data', error)
            }
            )
        }, [])

 // function to add new contact
    const addContact = (e)=>{
        e.preventDefault()
        
        // create a new object to add contact
        const contactObject = {
            id: new String(Math.floor(Math.random() * 100)),
            name: contactName,
            number: contactNumber,
            action: 'Delete'
        }

        if(contactName === '' || contactNumber === ''){
            alert('Please fill all the fields')
            return
        }else{
            // add new created object into contact array && server
            phonebook
            .createData(contactObject)
            .then(createNewContact =>{
                console.log(createNewContact)
                setContacts(contacts.concat(createNewContact))
            }).catch(error =>{
                console.log('Error creating contact', error)
            }
            )
        }

        

        //Notification for created contact
        setMessage(`Contact name ${contactObject.name} has been added`)
        setTimeout(()=>{
            setMessage(null)
        }, 5000)

        //Clear name(input) && number(input)
        setContactName('');
        setContactNumber('');
    }

//function to delete contact
    const deleteContact = (contact)=>{
        phonebook
        .deleteData(contact.id)
        .then(deleteContact =>{
            console.log(deleteContact)
            window.confirm(`${contact.name} will be deleted are you sure?`)
            alert(`${contact.name} is deleted`)
            setContacts(deleteContact)
           
            setMessage(`Contact name ${contact.name} has been deleted`)
            setTimeout(()=>{
           setMessage(null)
            }, 5000)
        })
        .catch(error =>{
            console.log('Error deleting contact', error)
        })
    }

    const showContactDetails = (contact)=>{
        setDetail(contact);
        setShowDetail(!showDetail);

    }

// code to handle name input changes
    const handleNameChange = (e)=>{
        e.preventDefault();
        setContactName(e.target.value);
    }    
// code to handle number input changes
    const handleNumberChange = (e)=>{
        e.preventDefault();
        setContactNumber(e.target.value);
    }   

        return(
            <>
                <div className='container'>

                <h2>PhoneBook</h2>
                    <form className='Form_control' action="#" onSubmit={addContact} >
                        <div>
                         <input placeholder="Name" type="text" value={contactName} onChange={handleNameChange}/>
                        <input placeholder="Number" type="tel" value={contactNumber} onChange={handleNumberChange}/>
                        </div>
                        <button type='submit'>Add Person</button>
                    </form>
                </div>

                <div className='contact_container'>
                    <div className="contact-header">
                    <h2>Contacts</h2>
                    <p className="message">{message}</p> 
                    </div>
                    <hr/>
                        {
                            contacts.length === 0 ? <p>No Contact Available</p> : contacts.map(contact =>{
                             return     <div className="contact-list" key={contact.id}>
                                            <h2 onClick={()=>{showContactDetails(contact)}}>{contact.name}</h2>
                                            {!showDetail && contact.name === detail.name ? <div className="contact-detail-container">
                                               <div className="contact-info" key={detail.id}>
                                               <p>{detail.name}</p>
                                               <p>{detail.number}</p>
                                               </div>
                                                <button className="contact-action" onClick={()=>{deleteContact(contact)}}>{detail.action}</button>
                                            </div>: null}
                                        </div>
                                
                            })
                        }
                </div>
            
            </> 
        )
}

export default App