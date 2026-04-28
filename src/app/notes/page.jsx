'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/fields/Button';
import { NOTES_VALUE } from '@/assets/constants/stateValue';
import NotesModal from '@/components/modals/NotesModal';
import { CREATE_NOTE_URL, GET_ALL_NOTES_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import Shimmer from '@/components/fields/Shimmer';
import EmptyState from '@/components/fields/EmptyState';

const borderColors = [
  'border-l-red-500',
  'border-l-green-500',
  'border-l-blue-500',
  'border-l-yellow-500',
  'border-l-purple-500',
];
const textColors = ['text-red-500', 'text-green-500', 'text-blue-500', 'text-yellow-500', 'text-purple-500'];

const Page = () => {
  const [allNotes, setAllNotes] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationButtons, setPaginationButtons] = useState([]);

  const [notes, setNotes] = useState(NOTES_VALUE);
  const [createLoading, setCreateLoading] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await axios.get(GET_ALL_NOTES_URL, {
      params: {
        page,
      },
    });
    if (res.data.success) {
      setAllNotes(res.data.data);
      const pagiBtns = Array.from({ length: res.data.data.totalPages }, (_, index) => index + 1);
      setPaginationButtons(pagiBtns);
    } else {
      notification(res.data.msg || 'Failed to get notes.', { type: 'error', id: 'getNotes' });
    }
    setLoading(false);
  };

  const submitNewNotes = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    const res = await axios.post(CREATE_NOTE_URL, notes);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'noteCreate' });
      fetchNotes();
      setPage(1);
      setNotes(NOTES_VALUE);
      setNoteModalOpen(false);
    } else {
      notification(res.data.msg || 'Failed to cretae note.', { type: 'error', id: 'noteCreate' });
    }
    setCreateLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  return (
    <div className="page-shell">
      <div className="page-toolbar">
        <div>
          <h1 className="page-title">Notes</h1>
          <p className="page-subtitle">Keep reminders, ideas, and personal finance plans in one place.</p>
        </div>
        <Button iconLeft={'+'} onClick={() => setNoteModalOpen(true)}>
          Add New Note
        </Button>
      </div>
      {loading && (
        <div className="flex w-full flex-col gap-y-4 lg:gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
            <Shimmer
              key={i}
              className={`h-[82px] rounded-2xl border-l-4 ${borderColors[i % borderColors.length]}`}
            />
          ))}
        </div>
      )}
      {!loading && !allNotes?.notes.length && (
        <EmptyState
          className="mt-4"
          title="No notes yet"
          description="Create notes for reminders, plans, or anything you want to keep beside your finance records."
          action={
            <Button size="small" iconLeft={'+'} onClick={() => setNoteModalOpen(true)}>
              Add New Note
            </Button>
          }
        />
      )}
      {!loading && allNotes?.notes && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {allNotes.notes?.map((note, i) => {
            return (
              <Link
                href={`/notes/${note.note_id}`}
                key={i}
                className={`app-surface min-h-[118px] w-full rounded-2xl border-l-[5px] p-4 transition-colors duration-300 hover:shadow-card ${borderColors[i % borderColors.length]}`}
              >
                <div className="flex h-full flex-col gap-y-2">
                  <h4 className={`truncate text-lg font-black ${textColors[i % textColors.length]}`}>
                    {note.title}
                  </h4>
                  <p className="line-clamp-3 text-sm leading-6 text-finance-muted">{note.description}</p>
                </div>
              </Link>
            );
          })}
          {paginationButtons.length > 1 && (
            <div className="col-span-full flex flex-wrap justify-end gap-2">
              {paginationButtons.map((pgNo, i) => (
                <button
                  key={i}
                  className={`rounded-full border border-finance-border px-3 py-1 text-sm font-bold transition hover:bg-pest hover:text-white ${pgNo === page ? 'bg-pest text-white' : 'bg-white text-finance-muted'}`}
                  onClick={() => setPage(pgNo)}
                >
                  {pgNo}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {noteModalOpen ? (
        <NotesModal
          modalOpen={noteModalOpen}
          setModalOpen={setNoteModalOpen}
          heading={'Add new note'}
          loading={createLoading}
          info={notes}
          setInfo={setNotes}
          handleSubmit={submitNewNotes}
        />
      ) : null}
    </div>
  );
};

export default Page;
