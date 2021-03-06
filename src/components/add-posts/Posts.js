import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase.config'
import { signOut } from 'firebase/auth'
import { Button, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ImExit } from 'react-icons/im'
import { FiEdit2 } from 'react-icons/fi'
import { Store } from '../../store/Store'
import style from './post.module.css'
import ModalProducts from '../Products/Modal'

const Posts = () => {
    const { state } = useContext(Store)
    const { isLogin, posts } = state
    const [modalShow, setModalShow] = useState(false);
    const [isEdit, setIsEdit] = useState('')
    const [postsValue, setPostsValue] = useState({
        name: '',
        price: ''
    })
    const onEdit = (item) => {
        setPostsValue(item)
        setModalShow(true)
    }
    const isAdd = () => {
        setPostsValue({
            name: '',
            price: ''
        })
        setModalShow(true)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-between align-items-center py-3'>
                        <p style={{ fontWeight: 700 }}>User: <span>Admin</span></p>
                        <Button colorScheme='red' leftIcon={<ImExit />} onClick={() => signOut(auth)}>Đăng xuất</Button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h3 className={style.titlePage}>Quản lý sản phẩm</h3>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-start align-items-center py-3'>

                        <Button colorScheme='green' onClick={() => isAdd()}>Thêm sản phẩm</Button>
                    </div>
                </div>
            </div>
            <div className='row  overflow-scroll'>
                <div className='col'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Table variant='simple' size='lg'>
                            <TableCaption><Link to='/' style={{
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}>Xem tất cả {posts.length} sản phẩm đã đăng trên web</Link> </TableCaption>
                            <Thead>

                                <Tr>
                                    <Th>Tên sản phẩm</Th>
                                    <Th>Giá</Th>
                                    <Th>Hình ảnh</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    posts.map((item) => (
                                        <Tr key={item.id}>
                                            <Td className={style.name_col}>{item.name}</Td>
                                            <Td >{(item.price).toLocaleString()}</Td>
                                            <Td ><img src={item.image[0]} className={style.img_posts} /></Td>
                                            <Td><FiEdit2 color='#aaa' fontSize={25} onClick={() => onEdit(item)} style={{ cursor: 'pointer' }} /></Td>
                                        </Tr>
                                    ))
                                }


                            </Tbody>

                        </Table>
                    </div>
                </div>
            </div>
            <ModalProducts
                show={modalShow}
                onHide={() => setModalShow(false)}
                postsValue={postsValue}
                setPostsValue={setPostsValue}

            />

        </div>
    )
}

export default Posts
