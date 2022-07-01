import { useEffect, useCallback } from 'react';
import {
  Button,
  ButtonLink,
  Card,
  Text,
  H2,
  Image,
  Form,
  FormInput,
  Researchio,
} from '@research.io/components';
import { useDopt } from '@dopt/react';

import newInterview from '@/public/static/new-interview.png';

const CalendarPage = () => {
  return (
    <Researchio.Page>
      <Researchio.Navigation />
      <Researchio.PageContent>
        <Researchio.LeftNav />
        <Researchio.Calendar />
        <Researchio.CalendarDetails />
      </Researchio.PageContent>
    </Researchio.Page>
  );
};

const CalendarDetails = ({ newInterviewPending, ...rest }) => {
  return (
    <>
      {!newInterviewPending ? (
        <ScheduleFirstInterviewCard />
      ) : (
        <NewInterviewForm />
      )}
      <FirstInterviewScheduledCard />
    </>
  );
};

const ScheduleFirstInterviewCard = () => {
  const [{ active }] = useDopt('schedule-first-interview-10zdae3');

  return (
    active && (
      <Card>
        <H2>Schedule your first interview</H2>
        <Text>
          Select a time on the calendar to schedule your first interview.
        </Text>
        <Image src={newInterview} width={150} height={150} />
      </Card>
    )
  );
};

const NewInterviewForm = ({ onCreateInterviewHandler }) => {
  const [_, { complete }] = useDopt('schedule-first-interview-10zdae3');

  const decoratedHandler = useCallback(
    (...args) => {
      onCreateInterviewHandler(...args);
      complete();
    },
    [onCreateInterviewHandler]
  );

  return (
    <Form>
      <H2>Schedule your first interview</H2>
      <FormInput></FormInput>
      <FormInput></FormInput>
      <FormInput></FormInput>
      <ButtonLink>Cancel</ButtonLink>
      <Button onClick={decoratedHandler}>Create</Button>
    </Form>
  );
};

const FirstInterviewScheduledCard = () => {
  const [{ active }, { complete }] = useDopt(
    'first-interview-scheduled-a42e481'
  );

  if (active) {
    useEffect(() => complete);
  }

  return (
    active && (
      <Card>
        <H2>First interview is scheduled!</H2>
        <Text>
          Nice! Your candidate just got an invite to your first interview.
        </Text>
        <ButtonLink onClick={complete}>Dismiss</ButtonLink>
      </Card>
    )
  );
};
