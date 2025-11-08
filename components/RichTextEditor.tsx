import React, { useRef, useCallback, useEffect, useState } from 'react';
import { 
    FormatBoldIcon, FormatItalicIcon, FormatListBulletedIcon, 
    FormatListNumberedIcon, ChecklistIcon, FormatParagraphIcon 
} from './icons/Icons';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

const ToolbarButton: React.FC<{ onClick: (e: React.MouseEvent) => void, isActive: boolean, title: string, children: React.ReactNode }> = ({ onClick, isActive, title, children }) => (
    <button
        type="button"
        onMouseDown={onClick}
        title={title}
        className={`p-2 rounded-md transition-colors ${isActive ? 'bg-[#A89AFF] text-black' : 'hover:bg-white/10'}`}
    >
        {children}
    </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, minHeight = '120px' }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Record<string, boolean | string>>({});

    const updateActiveFormats = useCallback(() => {
        const formats: Record<string, boolean | string> = {};
        formats.bold = document.queryCommandState('bold');
        formats.italic = document.queryCommandState('italic');
        formats.insertUnorderedList = document.queryCommandState('insertUnorderedList');
        formats.insertOrderedList = document.queryCommandState('insertOrderedList');
        
        let blockElem = document.queryCommandValue('formatBlock').toLowerCase();
        if (['h1', 'h2', 'p'].includes(blockElem)) {
             formats.block = blockElem;
        } else {
             formats.block = 'p';
        }
        
        // Check for checklist
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            let node = selection.getRangeAt(0).commonAncestorContainer;
            while (node && node !== editorRef.current) {
                if (node.nodeName === 'UL' && (node as HTMLElement).classList.contains('checklist')) {
                    formats.checklist = true;
                    break;
                }
                node = node.parentNode;
            }
        }

        setActiveFormats(formats);
    }, []);

    useEffect(() => {
        const handleSelectionChange = () => {
             if (document.activeElement === editorRef.current) {
                updateActiveFormats();
            }
        };
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [updateActiveFormats]);


    const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
        onChange(e.currentTarget.innerHTML);
    }, [onChange]);

    const handleCommand = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateActiveFormats();
    };

    const toggleChecklist = () => {
        handleCommand('insertUnorderedList');
        // A brief timeout to allow the DOM to update after execCommand
        setTimeout(() => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
            const range = selection.getRangeAt(0);
            let listElement = range.commonAncestorContainer;
            while (listElement && listElement.nodeName !== 'UL' && listElement.nodeName !== 'OL') {
                listElement = listElement.parentElement;
            }
            if (listElement && (listElement.nodeName === 'UL' || listElement.nodeName === 'OL')) {
                (listElement as HTMLElement).classList.toggle('checklist');
                onChange(editorRef.current.innerHTML);
            }
            updateActiveFormats();
        }, 50);
    };
    
    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.nodeName === 'LI' && (target.parentElement?.classList.contains('checklist'))) {
            e.preventDefault();
            target.classList.toggle('checked');
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
            }
        }
    };

    return (
        <div className="bg-[#1F2125] border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-[#A89AFF]/50 overflow-hidden">
            <div className="flex items-center gap-1 p-2 border-b border-gray-700 flex-wrap">
                <ToolbarButton onClick={() => handleCommand('formatBlock', '<h1>')} isActive={activeFormats.block === 'h1'} title="Heading 1">
                    <span className="font-bold text-sm">H1</span>
                </ToolbarButton>
                <ToolbarButton onClick={() => handleCommand('formatBlock', '<h2>')} isActive={activeFormats.block === 'h2'} title="Heading 2">
                    <span className="font-bold text-sm">H2</span>
                </ToolbarButton>
                 <ToolbarButton onClick={() => handleCommand('formatBlock', '<p>')} isActive={activeFormats.block === 'p'} title="Paragraph">
                    <FormatParagraphIcon />
                </ToolbarButton>
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                <ToolbarButton onClick={() => handleCommand('bold')} isActive={!!activeFormats.bold} title="Bold"><FormatBoldIcon /></ToolbarButton>
                <ToolbarButton onClick={() => handleCommand('italic')} isActive={!!activeFormats.italic} title="Italic"><FormatItalicIcon /></ToolbarButton>
                 <div className="w-px h-6 bg-gray-600 mx-1"></div>
                <ToolbarButton onClick={() => handleCommand('insertUnorderedList')} isActive={!!activeFormats.insertUnorderedList && !activeFormats.checklist} title="Bulleted List"><FormatListBulletedIcon /></ToolbarButton>
                <ToolbarButton onClick={() => handleCommand('insertOrderedList')} isActive={!!activeFormats.insertOrderedList} title="Numbered List"><FormatListNumberedIcon /></ToolbarButton>
                <ToolbarButton onClick={toggleChecklist} isActive={!!activeFormats.checklist} title="Checklist"><ChecklistIcon /></ToolbarButton>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onFocus={updateActiveFormats}
                onBlur={() => setActiveFormats({})}
                onClick={handleEditorClick}
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: value }}
                style={{ minHeight }}
                className="w-full note-content p-4 focus:outline-none resize-y overflow-auto"
                data-placeholder={placeholder}
            />
        </div>
    );
};

export default RichTextEditor;