import React, { useCallback, useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';
import ModalEditProduct from 'components/Modals/ModalEditProduct';
import ModalDelete from 'components/Modals/ModalDelete';
import HeaderMain from 'components/HeaderMain';
import Table from 'components/Table';

import formatCurrency from 'utils/formatCurrency';
import { Container } from './styles';

interface ProductDataForm {
  id: string;
  name: string;
  quantity: number;
  priceFormatted: string;
  dateFormatted: string;
  price: number;
  date: string;
}

interface Delete {
  id: string;
}

const RegisterProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Delete>({} as Delete);

  const [products, setProducts] = useState<ProductDataForm[]>([]);
  const [searchField, setSearchField] = useState<string>();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDataForm>(
    {} as ProductDataForm,
  );

  useEffect(() => {
    async function handleProducts() {
      const response = await api.get<ProductDataForm[]>('/products');
      const productsFormatted = response.data.map(product => ({
        ...product,
        priceFormatted: formatCurrency(Number(product.price)),
        dateFormatted: format(parseISO(product.date), 'dd/MM/yyyy'),
      }));

      if (!searchField) {
        setProducts(productsFormatted);
      }
    }

    handleProducts();
  }, [setProducts, searchField]);

  const handleSubmit = useCallback(
    async (data: ProductDataForm): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          quantity: Yup.string().required('Quantidade obrigatório'),
          price: Yup.string().required('Preço obrigatório'),
          date: Yup.string().required('Data obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<ProductDataForm>('products', data);

        setProducts([
          {
            ...response.data,
            priceFormatted: formatCurrency(Number(response.data.price)),
            dateFormatted: format(parseISO(response.data.date), 'dd/MM/yyyy'),
          },
          ...products,
        ]);

        addToast({
          type: 'success',
          title: 'Produto cadastrado com sucesso.',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastro cliente.',
          description: 'Erro no cadastro de cliente, tente novamente.',
        });
      }
    },
    [addToast, products],
  );

  const toggleEditModal = useCallback((): void => {
    setEditModalOpen(prevState => !prevState);
  }, []);

  const toggleDeleteModal = useCallback((): void => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleDeleteProduct = useCallback(async (): Promise<void> => {
    try {
      await api.delete(`/products/${deleteData.id}`);

      const findDeleteProduct = products.filter(
        product => product.id !== deleteData.id,
      );

      setProducts(findDeleteProduct);

      toggleDeleteModal();
      addToast({
        type: 'info',
        title: 'Produto excluido com sucesso.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao Excluir',
        description: 'Erro ao Excluir o produto, tente novamente.',
      });
    }
  }, [toggleDeleteModal, addToast, products, deleteData.id]);

  const handleDelete = useCallback(
    (id: Delete): void => {
      setDeleteData(id);

      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const handleUpdateProduct = useCallback(
    async (
      product: Omit<ProductDataForm, 'id' | 'priceFormatted' | 'dateFormatted'>,
    ) => {
      try {
        const response = await api.put(`/products/${editingProduct.id}`, {
          ...product,
        });

        setProducts(
          products.map(mappedProduct =>
            mappedProduct.id === editingProduct.id
              ? {
                  ...response.data,
                  dateFormatted: format(parseISO(product.date), 'dd/MM/yyyy'),
                  priceFormatted: formatCurrency(Number(product.price)),
                }
              : mappedProduct,
          ),
        );

        addToast({
          type: 'success',
          title: 'Editado com sucesso.',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: 'Ocorreu um erro ao editar, tente novamente.',
        });
      }
    },
    [addToast, products, editingProduct],
  );

  const handleEditProduct = useCallback(
    (product: ProductDataForm): void => {
      setEditingProduct(product);
      toggleEditModal();
    },
    [toggleEditModal],
  );
  const handleSearchKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setSearchField(value);
    },
    [],
  );

  useEffect(() => {
    async function handleSearch() {
      try {
        const response = await api.get(`/products/${searchField}`);

        if (searchField) {
          setProducts(response.data);
        }
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar produto.',
          description: 'Erro na pesquisa por produto, tente novamente.',
        });
      }
    }

    handleSearch();
  }, [addToast, searchField]);

  return (
    <Container>
      {editModalOpen && (
        <ModalEditProduct
          setIsOpen={toggleEditModal}
          editingProduct={editingProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}

      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleDeleteProduct}
        />
      )}

      <HeaderMain
        name="search"
        title="Cadastro de Produto"
        handleSearchKeyUp={handleSearchKeyUp}
        placeholder="Pesquise pelo nome do produto"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input
          name="quantity"
          type="number"
          placeholder="Quantidade"
          containerStyle={{ maxWidth: '130px' }}
        />
        <Input
          name="price"
          placeholder="R$ value"
          containerStyle={{ maxWidth: '160px' }}
        />
        <Input
          name="date"
          type="date"
          placeholder="Data"
          containerStyle={{ maxWidth: '210px' }}
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <Table
        nameOne="Nome"
        nameTwo="Valor"
        nameTree="Quantidade"
        nameFour="Data"
      >
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.priceFormatted}</td>
            <td>{product.quantity}</td>
            <td>{product.dateFormatted}</td>
            <td>
              <button type="button" onClick={() => handleEditProduct(product)}>
                <FiEdit size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete({ id: product.id })}
              >
                <FiTrash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default RegisterProduct;
