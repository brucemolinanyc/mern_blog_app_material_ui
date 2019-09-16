import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ButtonAppBar from './ButtonAppBar'

function BlogEntryGatePage(props){
    console.log(props)
    const [user, setUser] = useState('')

    useEffect(() => {
        async function fetchData() {
          const getUser = await axios('http://localhost:4000/users/me')
          console.log(getUser)
        }
        fetchData();
      });

    return(
        <div>
            <ButtonAppBar />
            This is the blog entry page post login
        
        </div>
    )

}

export default BlogEntryGatePage;

