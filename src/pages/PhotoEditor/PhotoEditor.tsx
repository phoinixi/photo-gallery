import { useLoaderData, useNavigation, Link as NavigationLink } from 'react-router-dom';
import { Button, Link, makeStyles, tokens } from '@fluentui/react-components';
import { PhotoInfo } from '../../models/PhotoInfo.Model';
import { useCallback, useMemo, useState } from 'react';
import { ArrowDownloadRegular } from '@fluentui/react-icons';
import { PhotoResize } from '../../components/PhotoResize/PhotoResize';
import useResize from '../../hooks/useResize';
import PhotoFilters from '../../components/PhotoFilters/PhotoFilters';
import { SpinnerOverlay } from '../../components/SpinnerOverlay/SpinnerOverlay';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import { useAtom } from 'jotai';
import { photoFileName } from '../../store';

const useStyles = makeStyles({
  root: {
    height: '100%',
    background: tokens.colorNeutralForegroundInverted,
    color: tokens.colorNeutralBackgroundInverted
  },

  backButton: {
    padding: tokens.spacingVerticalXXXL
  },

  editor: {
    display: 'grid',
    gridTemplateColumns: '250px max-content',
    placeContent: 'center',
    gap: tokens.spacingHorizontalXXXL
  },

  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingHorizontalXXL
  },

  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingHorizontalXXL
  }
});

export function PhotoEditor() {
  const classes = useStyles();
  const { state } = useNavigation();
  const isLoading = useMemo(() => state === 'loading', [state]);

  const photo = useLoaderData() as PhotoInfo;

  const [filename, setFilename] = useAtom(photoFileName);

  const onFilenameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilename(event.target.value);
    },
    [setFilename]
  );

  const { height, width } = useResize({ originalHeight: photo.height, originalWidth: photo.width });

  return (
    <section className={classes.root}>
      {isLoading && <SpinnerOverlay />}
      <NavigationLink to={'../'} className={classes.backButton}>
        <Button>Back to Photo gallery</Button>
      </NavigationLink>
      <div className={classes.editor}>
        <section className={classes.sideMenu}>
          <PhotoResize originalWidth={photo.width} originalHeight={photo.height} />
          <PhotoFilters />
          <label>
            File name:
            <input type="text" onChange={onFilenameChange} />
          </label>
        </section>

        <section className={classes.mainContent}>
          <PhotoCard mode="editor" photo={photo} />

          <Link href={photo.download_url} download={`${filename}`}>
            <Button icon={<ArrowDownloadRegular />}>Download</Button>
          </Link>
        </section>
      </div>
    </section>
  );
}

export default PhotoEditor;
